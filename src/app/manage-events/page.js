"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import SafeImage from "@/components/SafeImage";
import EmptyState from "@/components/EmptyState";
import { EventGridSkeleton } from "@/components/Skeletons";
import { useApi } from "@/lib/useApi";
import { apiFetch } from "@/lib/api";
import { confirmDelete } from "@/lib/swal";
import { formatDateTime, isPast } from "@/lib/format";

function ManageList() {
  const { data, loading, error, reload, setData } = useApi("/my-events");

  async function remove(event) {
    if (!(await confirmDelete(event.title))) return;
    try {
      await apiFetch(`/events/${event._id}`, { method: "DELETE" });
      setData((list) => list.filter((e) => e._id !== event._id));
      toast.success("Event deleted.");
    } catch (err) {
      toast.error(err.message);
    }
  }

  if (loading) return <EventGridSkeleton count={3} />;
  if (error) {
    return (
      <div className="stitch rounded-box p-10 text-center">
        <p className="font-semibold">{error}</p>
        <button onClick={reload} className="btn btn-primary mt-4">Try again</button>
      </div>
    );
  }
  if (!data.length) {
    return <EmptyState title="You have not created any events" text="Events you create will show up here so you can edit or delete them." href="/create-event" action="Create Event" />;
  }

  return (
    <ul className="space-y-4">
      {data.map((event) => (
        <li key={event._id} className="event-card !h-auto !flex-col sm:!flex-row">
          <SafeImage src={event.thumbnail} alt={event.title} className="aspect-[16/10] w-full sm:aspect-auto sm:h-auto sm:w-56 sm:shrink-0" />
          <div className="flex flex-1 flex-col gap-1 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-secondary font-semibold">{event.eventType}</span>
              {isPast(event.eventDate) && <span className="badge badge-ghost">Ended</span>}
            </div>
            <h2 className="mt-1 text-xl font-bold">{event.title}</h2>
            <p className="text-sm opacity-75">{event.location}</p>
            <p className="text-sm opacity-75">{formatDateTime(event.eventDate)}</p>
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
              <Link href={`/events/${event._id}`} className="btn btn-sm btn-outline">View</Link>
              <Link href={`/manage-events/${event._id}/edit`} className="btn btn-sm btn-primary"><FiEdit2 /> Update</Link>
              <button onClick={() => remove(event)} className="btn btn-sm btn-error btn-outline"><FiTrash2 /> Delete</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <div className="page-shell section-pad">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="section-title">Manage your events</h1>
            <p className="section-lead mt-3">Update the details or delete events you created.</p>
          </div>
          <Link href="/create-event" className="btn btn-primary">Create Event</Link>
        </div>
        <div className="mt-10"><ManageList /></div>
      </div>
    </PrivateRoute>
  );
}
