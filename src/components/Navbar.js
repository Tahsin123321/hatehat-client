"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiLogOut, FiMenu, FiPlusCircle, FiSettings, FiCheckSquare, FiUser } from "react-icons/fi";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

function Avatar({ user }) {
  const initial = (user.name || user.email || "?").trim()[0]?.toUpperCase();
  return user.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={user.image} alt={user.name || "Profile"} className="size-10 rounded-full object-cover" referrerPolicy="no-referrer" />
  ) : (
    <span className="flex size-10 items-center justify-center rounded-full bg-primary font-bold text-primary-content">
      {initial}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  async function logout() {
    await authClient.signOut();
    clearToken();
    toast.success("You have been logged out.");
    router.push("/");
  }

  const linkClass = (href) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
      pathname === href ? "bg-primary/10 text-primary" : "hover:bg-base-200"
    }`;

  const menuItems = (
    <>
      <li><Link href="/create-event"><FiPlusCircle /> Create Event</Link></li>
      <li><Link href="/manage-events"><FiSettings /> Manage Events</Link></li>
      <li><Link href="/joined-events"><FiCheckSquare /> Joined Events</Link></li>
      <li><Link href="/profile"><FiUser /> My Profile</Link></li>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="page-shell flex h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="dropdown md:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
              <FiMenu size={22} />
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              {links.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <Logo />
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          {isPending ? (
            <div className="skeleton size-10 rounded-full" aria-hidden="true" />
          ) : user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user.name || user.email}
                >
                  <button tabIndex={0} className="btn btn-ghost btn-circle p-0" aria-label="Account menu">
                    <Avatar user={user} />
                  </button>
                </div>
                <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                  {menuItems}
                </ul>
              </div>
              <button onClick={logout} className="btn btn-outline btn-primary btn-sm sm:btn-md">
                <FiLogOut /> <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
