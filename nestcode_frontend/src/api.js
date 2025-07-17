const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

/**
 * Formats an endpoint path to be relative to the API base URL.
 * @param {string} endpoint - Endpoint path, e.g. "/modules/"
 * @returns {string} Fully qualified URL, e.g. "https://.../api/modules/"
 */
// PUBLIC_INTERFACE
export function apiUrl(endpoint) {
  // Remove any leading "/api" if present for endpoint consistency
  if (endpoint.startsWith("/api/")) {
    return API_BASE_URL + endpoint.slice(4);
  }
  if (endpoint.startsWith("/")) {
    return API_BASE_URL + endpoint;
  }
  return API_BASE_URL + "/" + endpoint;
}
