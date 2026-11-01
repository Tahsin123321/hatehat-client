import { API_URL } from "./constants";

/* ---------- public fetch (server components) ---------- */
export async function publicGet(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return { data: null, status: res.status };
    return { data: await res.json(), status: res.status };
  } catch {
    return { data: null, status: 0 };
  }
}

/* ---------- authenticated fetch (client components) ---------- */
let tokenCache = { value: null, exp: 0 };

function readExp(token) {
  try {
    const part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(part)).exp * 1000;
  } catch {
    return Date.now() + 5 * 60 * 1000;
  }
}

export function clearToken() {
  tokenCache = { value: null, exp: 0 };
}

async function getToken() {
  if (tokenCache.value && tokenCache.exp - Date.now() > 30_000) {
    return tokenCache.value;
  }
  const { authClient } = await import("./auth-client");
  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    throw new ApiError("Your session has expired. Please log in again.", 401);
  }
  tokenCache = { value: data.token, exp: readExp(data.token) };
  return data.token;
}

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors || {};
  }
}

export async function apiFetch(path, { method = "GET", body } = {}) {
  const token = await getToken();
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(
      "Cannot reach the server. Check your connection and try again.",
      0
    );
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      json.message || "Something went wrong.",
      res.status,
      json.errors
    );
  }
  return json;
}
