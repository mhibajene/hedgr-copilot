import { _buildEnvFor } from "../config/env";

// Keep test output clean (suppress optional warnings)
const originalWarn = console.warn;
beforeAll(() => {
  process.env.NODE_ENV = "test";
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.warn = () => {};
});
afterAll(() => {
  console.warn = originalWarn;
});

describe("frontend env validation", () => {
  it("passes with a valid dev env", () => {
    const env = _buildEnvFor({
      NEXT_PUBLIC_APP_ENV: "dev",
      API_BASE_URL: "https://api.example.dev",
    } as unknown as NodeJS.ProcessEnv);

    expect(env).toMatchObject({
      NEXT_PUBLIC_APP_ENV: "dev",
      API_BASE_URL: "https://api.example.dev",
    });
  });

  it("fails when API_BASE_URL is missing", () => {
    expect(() =>
      _buildEnvFor({
        NEXT_PUBLIC_APP_ENV: "dev",
      } as unknown as NodeJS.ProcessEnv)
    ).toThrow(/API_BASE_URL/i);
  });

  it("fails when NEXT_PUBLIC_APP_ENV is invalid", () => {
    expect(() =>
      _buildEnvFor({
        NEXT_PUBLIC_APP_ENV: "invalid",
        API_BASE_URL: "https://api.example.dev",
      } as unknown as NodeJS.ProcessEnv)
    ).toThrow(/NEXT_PUBLIC_APP_ENV/i);
  });
});
