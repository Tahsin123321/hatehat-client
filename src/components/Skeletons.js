export function EventCardSkeleton() {
  return (
    <div className="event-card" aria-hidden="true">
      <div className="skeleton aspect-[16/10] w-full" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="skeleton h-5 w-24 rounded-full" />
        <div className="skeleton h-6 w-4/5 rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton mt-auto h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading events">
      {Array.from({ length: count }, (_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="page-shell section-pad" role="status" aria-label="Loading">
      <div className="skeleton h-10 w-64 rounded-lg" />
      <div className="skeleton mt-4 h-4 w-96 max-w-full rounded" />
      <div className="skeleton mt-10 h-64 w-full rounded-xl" />
    </div>
  );
}
