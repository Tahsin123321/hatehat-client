"use client";

import { useRouter } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import EventForm from "@/components/EventForm";
import { apiFetch } from "@/lib/api";
import { successAlert } from "@/lib/swal";

export default function CreateEventPage() {
  const router = useRouter();

  async function create(payload) {
    await apiFetch("/events", { method: "POST", body: payload });
    await successAlert("Event created", "Your event is now live on the Upcoming Events page.");
    router.push("/events");
  }

  return (
    <PrivateRoute>
      <div className="page-shell section-pad max-w-3xl">
        <h1 className="section-title">Create an event</h1>
        <p className="section-lead mt-3">
          Tell neighbours what you are organising. Only future dates are accepted.
        </p>
        <div className="stitch-inset mt-8 rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
          <EventForm submitLabel="Create Event" onSubmit={create} />
        </div>
      </div>
    </PrivateRoute>
  );
}
