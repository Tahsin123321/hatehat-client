import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell section-pad text-center">
      <p className="font-display text-7xl font-extrabold text-secondary">404</p>
      <h1 className="section-title mt-4">We could not find that page</h1>
      <p className="section-lead mx-auto mt-3">
        The link may be old, or the event may have been removed by its organizer.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">Back to home</Link>
        <Link href="/events" className="btn btn-outline">Browse upcoming events</Link>
      </div>
    </div>
  );
}
