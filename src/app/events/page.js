import { FiSearch } from "react-icons/fi";
import EventCard from "@/components/EventCard";
import EmptyState from "@/components/EmptyState";
import { publicGet } from "@/lib/api";
import { EVENT_TYPES } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const metadata = { title: "Upcoming Events" };

export default async function EventsPage({ searchParams }) {
  const { q = "", type = "", sort = "soonest" } = await searchParams;
  const qs = new URLSearchParams();
  if (q) qs.set("q", q);
  if (type) qs.set("type", type);
  if (sort === "latest") qs.set("sort", "latest");

  const { data, status } = await publicGet(`/events?${qs}`);
  const failed = data === null;
  const events = Array.isArray(data) ? data : [];
  const filtered = Boolean(q || type);

  return (
    <div className="page-shell section-pad">
      <h1 className="section-title">Upcoming events</h1>
      <p className="section-lead mt-3">
        Every event here is still ahead of us. Open one to see the details and join.
      </p>

      <form method="get" className="mt-8 grid gap-3 md:grid-cols-[1fr_14rem_12rem_auto]" role="search">
        <label className="input input-bordered flex items-center gap-2">
          <FiSearch aria-hidden="true" className="opacity-60" />
          <input name="q" defaultValue={q} placeholder="Search by title or place" className="grow" aria-label="Search events" />
        </label>
        <select name="type" defaultValue={type} className="select select-bordered" aria-label="Event type">
          <option value="">All types</option>
          {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select name="sort" defaultValue={sort} className="select select-bordered" aria-label="Sort order">
          <option value="soonest">Soonest first</option>
          <option value="latest">Recently added</option>
        </select>
        <button className="btn btn-primary">Apply</button>
      </form>

      <div className="mt-10">
        {failed ? (
          <EmptyState
            title="We could not load events"
            text={status === 0 ? "The server is not reachable. Make sure the API is running and NEXT_PUBLIC_API_URL is correct." : "The server returned an error. Please try again in a moment."}
          />
        ) : events.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => <EventCard key={e._id} event={e} />)}
          </div>
        ) : (
          <EmptyState
            title={filtered ? "No events match your search" : "No upcoming events yet"}
            text={filtered ? "Try a different word or clear the type filter." : "Be the first to organise something for your neighbourhood."}
            href={filtered ? "/events" : "/create-event"}
            action={filtered ? "Clear filters" : "Create Event"}
          />
        )}
      </div>
    </div>
  );
}
