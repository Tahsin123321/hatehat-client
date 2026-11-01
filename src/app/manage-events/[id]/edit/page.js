"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import EventForm from "@/components/EventForm";
import { PageSkeleton } from "@/components/Skeletons";
import EmptyState from "@/components/EmptyState";
import { useApi } from "@/lib/useApi";
import { apiFetch } from "@/lib/api";
import { toLocalInput } from "@/lib/format";
import { successAlert } from "@/lib/swal";
import { authClient } from "@/lib/auth-client";

function EditForm({ id }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { data: event, loading, error } = useApi(`/events/${id}`);

  if (loading) return <PageSkeleton />;
  if (error || !event) {
    return <EmptyState title="Event not found" text="It may have been deleted." href="/manage-events" action="Back to Manage Events" />;
  }
  if (session && event.creatorEmail !== session.user.email) {
    return <EmptyState title="You can only edit your own events" text="This event was created by someone else." href="/manage-events" action="Back to Manage Events" />;
  }

  const initial = {
    title: event.title,
    description: event.description,
    eventType: event.eventType,
    thumbnail: event.thumbnail,
    location: event.location,
    eventDate: toLocalInput(event.eventDate),
  };

  async function save(payload) {
    await apiFetch(`/events/${id}`, { method: "PUT", body: payload });
    await successAlert("Event updated", "Your changes are saved.");
    router.push("/manage-events");
  }

  return (
    <EventForm initial={initial} unchangedDate={initial.eventDate} submitLabel="Save changes" onSubmit={save} />
  );
}

export default function EditEventPage({ params }) {
  const { id } = use(params);
  return (
    <PrivateRoute>
      <div className="page-shell section-pad max-w-3xl">
        <h1 className="section-title">Update event</h1>
        <p className="section-lead mt-3">Change anything below and save.</p>
        <div className="stitch-inset mt-8 rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
          <EditForm id={id} />
        </div>
      </div>
    </PrivateRoute>
  );
}
