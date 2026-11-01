import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { LogoMark } from "./Logo";

const social = [
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebookF },
  { label: "X", href: "https://x.com", Icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com", Icon: FaGithub },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neutral text-neutral-content">
      <div className="stitch-line" />
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-bangla text-[clamp(5rem,20vw,16rem)] font-bold leading-none text-neutral-content/[0.06]"
      >
        হাতে হাত
      </p>

      <div className="page-shell relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <LogoMark size={34} />
            <span className="font-display text-2xl font-extrabold">HateHat</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-75">
            Hate hat means hand in hand. We help neighbours organise and join
            service events, from winter clothes drives to riverbank cleanups.
          </p>
          <ul className="mt-5 flex gap-2">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-neutral-content/25 transition-colors hover:border-secondary hover:bg-secondary hover:text-secondary-content"
                >
                  <Icon size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><Link className="hover:text-secondary" href="/events">Upcoming events</Link></li>
            <li><Link className="hover:text-secondary" href="/create-event">Create an event</Link></li>
            <li><Link className="hover:text-secondary" href="/joined-events">Events I joined</Link></li>
            <li><Link className="hover:text-secondary" href="/manage-events">Manage my events</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Event types</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><Link className="hover:text-secondary" href="/events?type=Donation">Donation drives</Link></li>
            <li><Link className="hover:text-secondary" href="/events?type=Cleanup">Cleanups</Link></li>
            <li><Link className="hover:text-secondary" href="/events?type=Plantation">Plantation</Link></li>
            <li><Link className="hover:text-secondary" href="/events?type=Health%20Camp">Health camps</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm opacity-80">
            <li className="flex gap-2"><FiMapPin className="mt-0.5 shrink-0" /> House 12, Road 5, Mirpur 10, Dhaka 1216</li>
            <li className="flex gap-2"><FiPhone className="mt-0.5 shrink-0" /> +880 1700-000000</li>
            <li className="flex gap-2"><FiMail className="mt-0.5 shrink-0" /> hello@hatehat.org</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-neutral-content/15">
        <div className="page-shell flex flex-col items-center justify-between gap-2 py-5 text-xs opacity-70 sm:flex-row">
          <p>© {new Date().getFullYear()} HateHat. Made with care in Bangladesh.</p>
          <p>Every event on this site is organised by local volunteers.</p>
        </div>
      </div>
    </footer>
  );
}
