import Link from "next/link";

export default function EmptyState({ title, text, href, action }) {
  return (
    <div className="stitch rounded-box px-6 py-14 text-center">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm opacity-75">{text}</p>
      {href && (
        <Link href={href} className="btn btn-primary mt-6">
          {action}
        </Link>
      )}
    </div>
  );
}
