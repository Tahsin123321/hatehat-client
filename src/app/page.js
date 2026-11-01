import Link from "next/link";
import { FiCalendar, FiCheckCircle, FiEdit3, FiMapPin, FiPlusCircle, FiUsers } from "react-icons/fi";
import EventCard from "@/components/EventCard";
import EmptyState from "@/components/EmptyState";
import SafeImage from "@/components/SafeImage";
import Newsletter from "@/components/Newsletter";
import { publicGet } from "@/lib/api";
import { GALLERY } from "@/lib/gallery";
import { formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";

const features = [
  {
    Icon: FiPlusCircle,
    title: "Post an event in a minute",
    text: "Add a title, place, date and a photo. Your event appears on the public list straight away.",
  },
  {
    Icon: FiUsers,
    title: "Join with one tap",
    text: "Open any event and press Join Event. Organisers see that people are coming.",
  },
  {
    Icon: FiCheckCircle,
    title: "Keep track of what you joined",
    text: "Your Joined Events page lists everything you signed up for, soonest first.",
  },
  {
    Icon: FiEdit3,
    title: "Update or cancel anytime",
    text: "Plans change. Edit the details or delete an event you created from Manage Events.",
  },
];

export default async function Home() {
  const { data } = await publicGet("/events?limit=6");
  const events = Array.isArray(data) ? data : [];
  const next = events[0];

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden bg-neutral text-neutral-content">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 hidden h-[34rem] w-[34rem] opacity-60 lg:block"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="150" cy="200" r="120" stroke="#f2a900" strokeWidth="3" strokeDasharray="12 9" />
          <circle cx="250" cy="200" r="120" stroke="#9aa8ff" strokeWidth="3" strokeDasharray="12 9" />
        </svg>

        <div className="page-shell relative grid items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="font-bangla text-xl font-bold text-secondary">হাতে হাত</p>
            <h1 className="mt-3 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02]">
              Show up for your neighbourhood, hand in hand.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-content/80">
              Winter clothes in Mirpur. Blankets in Mohammadpur. A lake that needs
              cleaning in Dhanmondi. Find a service event near you, or start one
              and let others join.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/events" className="btn btn-primary border-0 bg-secondary text-secondary-content hover:brightness-95">
                Find an event
              </Link>
              <Link href="/create-event" className="btn btn-outline border-neutral-content/40 text-neutral-content hover:bg-neutral-content hover:text-neutral">
                Start your own
              </Link>
            </div>
          </div>

          <div className="stitch-inset rounded-box bg-base-100 p-6 text-base-content shadow-xl">
            <p className="font-display text-sm font-bold text-accent">Next up</p>
            {next ? (
              <>
                <h2 className="mt-2 text-2xl font-bold leading-snug">{next.title}</h2>
                <p className="mt-4 flex items-start gap-2 text-sm"><FiMapPin className="mt-0.5 shrink-0 text-accent" />{next.location}</p>
                <p className="mt-2 flex items-start gap-2 text-sm"><FiCalendar className="mt-0.5 shrink-0 text-accent" />{formatDateTime(next.eventDate)}</p>
                <Link href={`/events/${next._id}`} className="btn btn-primary mt-6 w-full">View Event</Link>
              </>
            ) : (
              <>
                <h2 className="mt-2 text-2xl font-bold leading-snug">No upcoming events yet</h2>
                <p className="mt-3 text-sm opacity-75">Be the first to post one. It takes about a minute.</p>
                <Link href="/create-event" className="btn btn-primary mt-6 w-full">Create Event</Link>
              </>
            )}
          </div>
        </div>
        <div className="stitch-line" />
      </section>

      {/* Features */}
      <section className="section-pad">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="section-title">Everything a neighbourhood drive needs</h2>
            <p className="section-lead mt-4">
              HateHat keeps it simple: one place to post an event, one place to
              join, and no sign-up fees.
            </p>
          </div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {features.map(({ Icon, title, text }) => (
              <li key={title} className="border-t-2 border-dashed border-secondary/70 pt-5">
                <Icon size={26} className="text-accent" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed opacity-75">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recent upcoming events */}
      <section className="section-pad bg-base-200">
        <div className="page-shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="section-title">Happening soon</h2>
              <p className="section-lead mt-3">The next six events, soonest first.</p>
            </div>
            <Link href="/events" className="btn btn-outline btn-primary">See all events</Link>
          </div>
          <div className="mt-10">
            {events.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Nothing scheduled right now"
                text="Events appear here as soon as someone creates one. If this list stays empty, check that the server is running."
                href="/create-event"
                action="Create Event"
              />
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-pad">
        <div className="page-shell">
          <h2 className="section-title">From our past drives</h2>
          <p className="section-lead mt-3">
            Moments from neighbourhood events that volunteers organised on HateHat.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {GALLERY.map((g) => (
              <figure key={g.caption} className="group relative overflow-hidden rounded-box">
                <SafeImage src={g.src} alt={g.caption} className="aspect-square w-full" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-10 text-sm font-medium text-white">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
