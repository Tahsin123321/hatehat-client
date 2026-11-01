"use client";

import PrivateRoute from "@/components/PrivateRoute";
import EventCard from "@/components/EventCard";
import EmptyState from "@/components/EmptyState";
import { EventGridSkeleton } from "@/components/Skeletons";
import { useApi } from "@/lib/useApi";
import { isPast } from "@/lib/format";

function JoinedList() {
  const { data, loading, error, reload } = useApi("/joined-events");

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
    return <EmptyState title="You have not joined any events yet" text="Find a drive near you and press Join Event. It will be listed here." href="/events" action="Browse upcoming events" />;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((event) => (
        <EventCard key={event._id} event={event}>
          {isPast(event.eventDate) && <span className="badge badge-ghost w-fit">Ended</span>}
        </EventCard>
      ))}
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <div className="page-shell section-pad">
        <h1 className="section-title">Events you joined</h1>
        <p className="section-lead mt-3">Sorted by event date, soonest first.</p>
        <div className="mt-10"><JoinedList /></div>
      </div>
    </PrivateRoute>
  );
}
