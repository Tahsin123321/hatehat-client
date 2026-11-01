import { LogoMark } from "./Logo";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="page-shell grid min-h-[calc(100vh-4rem)] items-center gap-12 py-12 lg:grid-cols-2">
      <div className="hidden lg:block">
        <LogoMark size={56} />
        <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] text-primary">
          Good things start with one neighbour.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed opacity-75">
          Log in to post an event, join a drive, or see what you signed up for.
        </p>
        <div className="stitch-line mt-10 max-w-xs" />
      </div>
      <div className="stitch-inset mx-auto w-full max-w-md rounded-box border border-base-300 bg-base-100 p-7 sm:p-9">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mt-1.5 text-sm opacity-70">{subtitle}</p>
        <div className="mt-7">{children}</div>
        <p className="mt-6 text-center text-sm">{footer}</p>
      </div>
    </div>
  );
}
