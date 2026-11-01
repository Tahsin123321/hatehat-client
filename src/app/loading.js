import { EventGridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="page-shell section-pad">
      <div className="skeleton h-10 w-64 rounded-lg" />
      <div className="skeleton mt-4 h-4 w-96 max-w-full rounded" />
      <div className="mt-10"><EventGridSkeleton count={6} /></div>
    </div>
  );
}
