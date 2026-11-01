const TZ = "Asia/Dhaka";

export function formatDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TZ,
  }).format(new Date(value));
}

export function formatTime(value) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TZ,
  }).format(new Date(value));
}

export function formatDateTime(value) {
  return `${formatDate(value)}, ${formatTime(value)}`;
}

export function isPast(value) {
  return new Date(value).getTime() <= Date.now();
}

// Value for <input type="datetime-local"> in Dhaka time (UTC+6, no DST).
export function toLocalInput(value) {
  const d = new Date(new Date(value).getTime() + 6 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 16);
}

export function fromLocalInput(local) {
  return new Date(`${local}:00+06:00`).toISOString();
}

export function minLocalInput() {
  return toLocalInput(new Date(Date.now() + 60 * 60 * 1000));
}
