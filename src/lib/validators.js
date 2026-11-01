const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function validatePassword(password) {
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password))
    return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(password))
    return "Password must include a lowercase letter.";
  return "";
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!EMAIL.test(email.trim())) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Enter your password.";
  return errors;
}

export function validateRegister({ name, email, photoURL, password }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
  if (!EMAIL.test(email.trim())) errors.email = "Enter a valid email address.";
  if (!isUrl(photoURL.trim()))
    errors.photoURL = "Enter a valid photo URL starting with http or https.";
  const pw = validatePassword(password);
  if (pw) errors.password = pw;
  return errors;
}

export function validateEventForm(f, { requireFuture = true } = {}) {
  const errors = {};
  const title = f.title.trim();
  const description = f.description.trim();
  const location = f.location.trim();
  if (title.length < 3 || title.length > 100)
    errors.title = "Title must be 3 to 100 characters.";
  if (description.length < 20 || description.length > 1500)
    errors.description = "Description must be 20 to 1500 characters.";
  if (!f.eventType) errors.eventType = "Pick an event type.";
  if (!isUrl(f.thumbnail.trim()))
    errors.thumbnail = "Enter a valid image URL starting with http or https.";
  if (location.length < 3 || location.length > 120)
    errors.location = "Location must be 3 to 120 characters.";
  if (!f.eventDate) {
    errors.eventDate = "Choose the event date and time.";
  } else if (requireFuture && new Date(`${f.eventDate}:00+06:00`) <= new Date()) {
    errors.eventDate = "The event date must be in the future.";
  }
  return errors;
}
