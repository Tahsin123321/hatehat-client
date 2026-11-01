// Only allow same-site relative paths after login.
export function safeRedirect(value) {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/";
}
