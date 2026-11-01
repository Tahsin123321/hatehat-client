"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Field from "./Field";
import { EVENT_TYPES } from "@/lib/constants";
import { validateEventForm } from "@/lib/validators";
import { fromLocalInput, minLocalInput } from "@/lib/format";

export default function EventForm({ initial, submitLabel, onSubmit, unchangedDate }) {
  const [form, setForm] = useState(
    initial || { title: "", description: "", eventType: "", thumbnail: "", location: "", eventDate: "" }
  );
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const cls = (key, base = "input") => `${base} ${base}-bordered w-full ${errors[key] ? `${base}-error` : ""}`;

  async function submit(e) {
    e.preventDefault();
    // When editing, a date that was not touched is allowed to be in the past.
    const found = validateEventForm(form, { requireFuture: form.eventDate !== unchangedDate });
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0]);
      return;
    }
    setBusy(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim(),
        eventType: form.eventType,
        thumbnail: form.thumbnail.trim(),
        location: form.location.trim(),
        eventDate: fromLocalInput(form.eventDate),
      });
    } catch (err) {
      if (err.errors && Object.keys(err.errors).length) setErrors(err.errors);
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <Field label="Event title" id="title" error={errors.title}>
        <input id="title" value={form.title} onChange={set("title")} placeholder="Winter Clothes Distribution" className={cls("title")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Event type" id="eventType" error={errors.eventType}>
          <select id="eventType" value={form.eventType} onChange={set("eventType")} className={cls("eventType", "select")}>
            <option value="" disabled>Choose a type</option>
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Date and time" id="eventDate" error={errors.eventDate} hint="Dhaka time. Must be in the future.">
          <input id="eventDate" type="datetime-local" min={minLocalInput()} value={form.eventDate} onChange={set("eventDate")} className={cls("eventDate")} />
        </Field>
      </div>

      <Field label="Location" id="location" error={errors.location}>
        <input id="location" value={form.location} onChange={set("location")} placeholder="Mirpur 10, Dhaka" className={cls("location")} />
      </Field>

      <Field label="Thumbnail image URL" id="thumbnail" error={errors.thumbnail} hint="A link to a photo that represents the event.">
        <input id="thumbnail" type="url" value={form.thumbnail} onChange={set("thumbnail")} placeholder="https://..." className={cls("thumbnail")} />
      </Field>

      <Field label="Description" id="description" error={errors.description} hint={`${form.description.trim().length}/1500. Say what volunteers will do and what to bring.`}>
        <textarea id="description" rows={6} value={form.description} onChange={set("description")} className={cls("description", "textarea")} />
      </Field>

      <button type="submit" disabled={busy} className="btn btn-primary w-full sm:w-auto sm:px-10">
        {busy ? <span className="loading loading-spinner loading-sm" /> : submitLabel}
      </button>
    </form>
  );
}
