import Link from "next/link";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import SafeImage from "./SafeImage";
import { formatDateTime } from "@/lib/format";

export default function EventCard({ event, children }) {
  return (
    <article className="event-card">
      <div className="relative">
        <SafeImage src={event.thumbnail} alt={event.title} className="aspect-[16/10] w-full" />
        <span className="badge badge-secondary absolute left-3 top-3 font-semibold">
          {event.eventType}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 min-h-[3.25rem] text-xl font-bold leading-snug">{event.title}</h3>
        <p className="flex items-start gap-2 text-sm opacity-80">
          <FiMapPin className="mt-0.5 shrink-0 text-accent" />
          <span className="line-clamp-1">{event.location}</span>
        </p>
        <p className="flex items-start gap-2 text-sm opacity-80">
          <FiCalendar className="mt-0.5 shrink-0 text-accent" />
          <span>{formatDateTime(event.eventDate)}</span>
        </p>
        {children}
        <Link href={`/events/${event._id}`} className="btn btn-primary mt-auto w-full">
          View Event
        </Link>
      </div>
    </article>
  );
}
