import { randomUUID } from "node:crypto";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import * as z from "zod";

import { CANONICAL_STATUS_PATH } from "./guards.js";
import { draftAdr, listAdrs, readDoc, readStatus, updateStatus } from "./fs.js";

const HOST = "127.0.0.1";
const PORT = 3333;
const MCP_PATH = "/mcp";
const MAX_BODY_BYTES = 1_000_000;

type Session = {
  server: McpServer;
  transport: StreamableHTTPServerTransport;
};

class HttpError extends Error {
  constructor(
    readonly statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

const sessions = new Map<string, Session>();

function createTextResult(text: string) {
  return {
    content: [
      {
        type: "text" as const,
        text,
      },
    ],
  };
}

function createMcpSessionServer(): McpServer {
  const server = new McpServer({
    name: "hedgrops-mcp",
    version: "0.1.0",
  });

  server.registerTool(
    "read_status",
    {
      description: "Read the canonical Hedgr sprint status file.",
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
      },
    },
    async () => createTextResult(await readStatus()),
  );

  server.registerTool(
    "update_status",
    {
      description: `Fully overwrite ${CANONICAL_STATUS_PATH}.`,
      inputSchema: {
        content: z.string(),
      },
      annotations: {
        readOnlyHint: false,
        openWorldHint: false,
      },
    },
    async ({ content }) => {
      const updatedPath = await updateStatus(content);
      return createTextResult(`Updated ${updatedPath}`);
    },
  );

  server.registerTool(
    "read_doc",
    {
      description: "Read a single allowlisted documentation file.",
      inputSchema: {
        path: z.string(),
      },
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
      },
    },
    async ({ path: requestedPath }) => createTextResult(await readDoc(requestedPath)),
  );

  server.registerTool(
    "list_adrs",
    {
      description: "List markdown files under docs/decisions.",
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
      },
    },
    async () => createTextResult((await listAdrs()).join("\n")),
  );

  server.registerTool(
    "draft_adr",
    {
      description: "Create a new ADR draft under docs/decisions/NNNN-title.md.",
      inputSchema: {
        path: z.string(),
        content: z.string().optional(),
      },
      annotations: {
        readOnlyHint: false,
        openWorldHint: false,
      },
    },
    async ({ path: requestedPath, content }) => {
      const createdPath = await draftAdr(requestedPath, content ?? "");
      return createTextResult(`Created ${createdPath}`);
    },
  );

  return server;
}

function sendJson(response: ServerResponse, statusCode: number, payload: unknown): void {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

function sendMethodNotAllowed(response: ServerResponse): void {
  response.writeHead(405, {
    allow: "GET, POST, DELETE",
    "content-type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify({ error: "Method not allowed." }));
}

function getSessionId(request: IncomingMessage): string | undefined {
  const sessionHeader = request.headers["mcp-session-id"];
  return Array.isArray(sessionHeader) ? sessionHeader[0] : sessionHeader;
}

function isInitializeRequest(body: unknown): boolean {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  return "method" in body && (body as { method?: unknown }).method === "initialize";
}

async function parseJsonBody(request: IncomingMessage): Promise<unknown> {
  const bodyChunks: Buffer[] = [];
  let totalBytes = 0;

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalBytes += buffer.length;

    if (totalBytes > MAX_BODY_BYTES) {
      throw new HttpError(413, "Request body exceeds the allowed limit.");
    }

    bodyChunks.push(buffer);
  }

  if (bodyChunks.length === 0) {
    return undefined;
  }

  const rawBody = Buffer.concat(bodyChunks).toString("utf8");

  try {
    return JSON.parse(rawBody);
  } catch {
    throw new HttpError(400, "Request body must be valid JSON.");
  }
}

async function createSession(): Promise<Session> {
  const server = createMcpSessionServer();
  let transport!: StreamableHTTPServerTransport;

  transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (sessionId) => {
      sessions.set(sessionId, { server, transport });
    },
    onsessionclosed: async (sessionId) => {
      const session = sessions.get(sessionId);
      sessions.delete(sessionId);
      await session?.server.close();
    },
  });

  transport.onclose = () => {
    const sessionId = transport.sessionId;

    if (!sessionId) {
      return;
    }

    const session = sessions.get(sessionId);
    sessions.delete(sessionId);
    void session?.server.close();
  };

  await server.connect(transport);
  return { server, transport };
}

async function getSessionForRequest(request: IncomingMessage, body?: unknown): Promise<Session> {
  const sessionId = getSessionId(request);

  if (sessionId) {
    const existingSession = sessions.get(sessionId);

    if (!existingSession) {
      throw new HttpError(404, "Unknown MCP session.");
    }

    return existingSession;
  }

  if (!isInitializeRequest(body)) {
    throw new HttpError(400, "A sessionless request must be an initialize call.");
  }

  return createSession();
}

async function handleMcpPost(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const parsedBody = await parseJsonBody(request);

  if (!parsedBody) {
    throw new HttpError(400, "POST requests must include a JSON body.");
  }

  const session = await getSessionForRequest(request, parsedBody);
  await session.transport.handleRequest(request, response, parsedBody);
}

async function handleMcpGet(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const sessionId = getSessionId(request);

  if (!sessionId) {
    throw new HttpError(400, "GET requests require an MCP session ID.");
  }

  const session = sessions.get(sessionId);
  if (!session) {
    throw new HttpError(404, "Unknown MCP session.");
  }

  await session.transport.handleRequest(request, response);
}

async function handleMcpDelete(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const sessionId = getSessionId(request);

  if (!sessionId) {
    throw new HttpError(400, "DELETE requests require an MCP session ID.");
  }

  const session = sessions.get(sessionId);
  if (!session) {
    throw new HttpError(404, "Unknown MCP session.");
  }

  await session.transport.handleRequest(request, response);
}

const httpServer = createServer(async (request, response) => {
  try {
    if (!request.url) {
      throw new HttpError(400, "Request URL is required.");
    }

    const requestUrl = new URL(request.url, `http://${HOST}:${PORT}`);
    if (requestUrl.pathname !== MCP_PATH) {
      sendJson(response, 404, { error: "Not found." });
      return;
    }

    switch (request.method) {
      case "POST":
        await handleMcpPost(request, response);
        return;
      case "GET":
        await handleMcpGet(request, response);
        return;
      case "DELETE":
        await handleMcpDelete(request, response);
        return;
      default:
        sendMethodNotAllowed(response);
        return;
    }
  } catch (error) {
    if (response.headersSent) {
      return;
    }

    if (error instanceof HttpError) {
      sendJson(response, error.statusCode, { error: error.message });
      return;
    }

    sendJson(response, 500, {
      error: error instanceof Error ? error.message : "Internal server error.",
    });
  }
});

async function shutdown(): Promise<void> {
  for (const [sessionId, session] of sessions) {
    sessions.delete(sessionId);
    await session.transport.close();
    await session.server.close();
  }

  await new Promise<void>((resolve, reject) => {
    httpServer.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

process.on("SIGINT", () => {
  void shutdown().finally(() => process.exit(0));
});

process.on("SIGTERM", () => {
  void shutdown().finally(() => process.exit(0));
});

httpServer.listen(PORT, HOST, () => {
  console.log(`HedgrOps MCP listening on http://${HOST}:${PORT}${MCP_PATH}`);
});
