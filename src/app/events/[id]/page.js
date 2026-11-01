import { notFound } from "next/navigation";
import Link from "next/link";
import { FiCalendar, FiClock, FiMapPin, FiUser, FiUsers } from "react-icons/fi";
import SafeImage from "@/components/SafeImage";
import JoinButton from "@/components/JoinButton";
import EmptyState from "@/components/EmptyState";
import { publicGet } from "@/lib/api";
import { formatDate, formatTime, isPast } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data } = await publicGet(`/events/${id}`);
  return { title: data?.title || "Event details" };
}

export default async function EventDetails({ params }) {
  const { id } = await params;
  const { data: event, status } = await publicGet(`/events/${id}`);
  if (status === 404) notFound();
  if (!event) {
    return (
      <div className="page-shell section-pad">
        <EmptyState title="We could not load this event" text="The server did not respond. Please refresh in a moment." href="/events" action="Back to events" />
      </div>
    );
  }
  const ended = isPast(event.eventDate);

  return (
    <div className="page-shell py-10 md:py-14">
      <Link href="/events" className="text-sm font-semibold text-primary underline underline-offset-4">
        All upcoming events
      </Link>

      <div className="mt-5 overflow-hidden rounded-box">
        <SafeImage src={event.thumbnail} alt={event.title} className="aspect-[16/8] w-full" />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div>
          <span className="badge badge-secondary font-semibold">{event.eventType}</span>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">{event.title}</h1>
          <div className="stitch-line my-6 max-w-sm" />
          <p className="max-w-[68ch] whitespace-pre-line text-lg leading-relaxed opacity-85">{event.description}</p>
        </div>

        <aside className="stitch-inset h-fit rounded-box border border-base-300 bg-base-100 p-6">
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><FiCalendar className="mt-0.5 shrink-0 text-accent" size={18} /><span><b className="block">Date</b>{formatDate(event.eventDate)}</span></li>
            <li className="flex gap-3"><FiClock className="mt-0.5 shrink-0 text-accent" size={18} /><span><b className="block">Time</b>{formatTime(event.eventDate)} (Dhaka)</span></li>
            <li className="flex gap-3"><FiMapPin className="mt-0.5 shrink-0 text-accent" size={18} /><span><b className="block">Location</b>{event.location}</span></li>
            <li className="flex gap-3"><FiUser className="mt-0.5 shrink-0 text-accent" size={18} /><span><b className="block">Organiser</b>{event.creatorName || event.creatorEmail}</span></li>
            <li className="flex gap-3"><FiUsers className="mt-0.5 shrink-0 text-accent" size={18} /><span><b className="block">Volunteers joined</b>{event.participants}</span></li>
          </ul>
          <div className="mt-6">
            <JoinButton eventId={event._id} title={event.title} ended={ended} />
          </div>
        </aside>
      </div>
    </div>
  );
}
