ID: MC-INFRA-001
Title: HedgrOps Remote MCP Server (ChatGPT Connector)
Sprint: Infra / HedgrOps Platform
Priority: High
Owner: HedgrOps / Platform

⸻

Objective

Implement a remote HedgrOps MCP server that allows ChatGPT to act as a founder / co-architect interface to the Hedgr repository without granting code-editing access.

The server must expose a restricted institutional interface:
	•	read doctrine and architecture documents
	•	read ADR history
	•	read and update HEGDR_STATUS.md
	•	draft ADR files

This server will be exposed via HTTPS (ngrok) and connected to ChatGPT using the MCP /mcp endpoint.

Cursor remains the execution layer.

⸻

Architectural Context

HedgrOps system architecture:

ChatGPT (Founder / Co-Architect)
        ↓
HedgrOps MCP Server
        ↓
docs/ (institutional memory)
        ↓
Cursor (engineering execution)
        ↓
apps / packages

This enforces:
	•	doctrine driven development
	•	auditable architectural decisions
	•	controlled AI write access

⸻

Implementation Scope

Create a minimal MCP server inside:

tools/hedgrops-mcp/

The server must:
	•	expose an MCP endpoint at /mcp
	•	run locally on port 3333
	•	enforce strict repo access policies
	•	expose the following tools

⸻

Tools to Implement

Tool 1 — read_status

Reads:

docs/ops/HEGDR_STATUS.md

Purpose:
	•	ChatGPT reviews sprint context
	•	planning sessions reference active sprint

⸻

Tool 2 — update_status

Writes only:

docs/ops/HEGDR_STATUS.md

Purpose:
	•	print sprint plan
	•	update task status
	•	modify architectural constraints

Input:

content: string


⸻

Tool 3 — read_doc

Reads allowlisted documentation:

docs/**
AGENTS.md
README.md
.cursor/rules.md
.cursorrules

Purpose:
	•	doctrine lookup
	•	architecture review
	•	module boundaries

⸻

Tool 4 — list_adrs

Lists:

docs/decisions/*.md

Purpose:
	•	show decision history
	•	verify ADR coverage

⸻

Tool 5 — draft_adr

Creates:

docs/decisions/NNNN-title.md

Rules:
	•	must begin with 4 digit prefix
	•	.md extension
	•	create only (no overwrite)

Purpose:
	•	institutional decision logging

⸻

Access Control Policy

Allowed Reads

docs/**
AGENTS.md
README.md
.cursor/rules.md
.cursorrules

Allowed Writes

docs/ops/HEGDR_STATUS.md
docs/decisions/[0-9][0-9][0-9][0-9]-*.md

Deny All Other Paths

Explicitly block:

apps/**
packages/**
scripts/**
env/**
.github/**
.turbo/**
.changeset/**
**/.env*
apps/frontend/.env.local
package*.json
pnpm-lock.yaml
Dockerfile
docker-compose.yml
doppler.yaml


⸻

File Structure

Create:

tools/
└── hedgrops-mcp/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── server.ts
        ├── guards.ts
        └── fs.ts


⸻

Dependencies

Install:

@modelcontextprotocol/sdk
zod
typescript
tsx
@types/node


⸻

Server Behaviour

Server must:
	•	listen on

http://127.0.0.1:3333/mcp

	•	support Streamable HTTP MCP transport
	•	expose tool metadata to ChatGPT

⸻

Development Commands

Run locally:

npm run dev

Expected output:

HedgrOps MCP listening on http://127.0.0.1:3333/mcp


⸻

Local Development Exposure

Expose via ngrok:

ngrok http 3333

Resulting connector URL:

https://<ngrok-id>.ngrok-free.app/mcp

This will be used in ChatGPT:

Settings → Connectors → Developer Mode → Add Connector


⸻

Testing Plan

Test 1

ChatGPT reads status

read_status

Expected: returns contents of HEGDR_STATUS.md

⸻

Test 2

Read doctrine

read_doc docs/doctrine/hedgr-constitutional-charter.md

Expected: returns markdown content.

⸻

Test 3

List ADRs

list_adrs

Expected: returns list of ADR markdown files.

⸻

Test 4

Update status

update_status

Expected: overwrites HEGDR_STATUS.md.

⸻

Test 5

Draft ADR

draft_adr docs/decisions/0016-test.md

Expected: file created.

⸻

Non-Goals

The MCP server must not:
	•	edit application code
	•	access environment files
	•	access build artifacts
	•	access secrets
	•	modify .cursor behaviour
	•	mutate CI configuration

Cursor remains the only code-editing agent.

⸻

Acceptance Criteria

The implementation is complete when:
	1.	MCP server runs locally.
	2.	/mcp endpoint responds correctly.
	3.	ChatGPT connector successfully registers tools.
	4.	ChatGPT can read doctrine docs.
	5.	ChatGPT can update HEGDR_STATUS.md.
	6.	ChatGPT can draft ADR files.
	7.	Path guardrails prevent unauthorized repo access.

⸻

Future Enhancements (Not in Scope)

Possible future tools:

list_modules
read_module_doc
list_doctrine
validate_doctrine_conflicts
generate_sprint_plan

These should be added only after the base server proves stable.

⸻

Execution Prompt for Cursor

After creating the ticket, run:

Implement MC-INFRA-001.

Create a HedgrOps MCP server under tools/hedgrops-mcp implementing the tool set and access policy defined in the ticket.

Focus on:
- path guardrails
- minimal tool implementation
- streamable HTTP MCP server
- local development readiness.

Do not modify application code outside tools/hedgrops-mcp.

