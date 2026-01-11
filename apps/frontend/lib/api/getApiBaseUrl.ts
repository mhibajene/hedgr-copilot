/**
 * Runtime validator for API_BASE_URL.
 * 
 * This function should be called when making API calls that require API_BASE_URL.
 * It validates the URL at runtime (not at build time), which allows the build
 * to succeed even when API_BASE_URL is not set.
 * 
 * @throws Error if API_BASE_URL is missing or invalid
 * @returns Valid API_BASE_URL string
 */
export function getApiBaseUrl(): string {
  const v = process.env.API_BASE_URL;

  if (!v) {
    throw new Error("API_BASE_URL is required at runtime");
  }

  try {
    const u = new URL(v);
    if (u.protocol !== "http:" && u.protocol !== "https:") {
      throw new Error();
    }
    return v;
  } catch {
    throw new Error("API_BASE_URL must be a valid http(s) URL");
  }
}
