import Link from "next/link";

export function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="15" cy="20" r="10" stroke="var(--color-primary)" strokeWidth="4" />
      <circle cx="25" cy="20" r="10" stroke="var(--color-secondary)" strokeWidth="4" strokeDasharray="5 3.5" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="HateHat home">
      <LogoMark />
      <span className="font-display text-2xl font-extrabold tracking-tight text-primary">
        HateHat
      </span>
    </Link>
  );
}
