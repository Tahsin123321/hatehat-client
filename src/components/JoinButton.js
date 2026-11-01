"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { successAlert } from "@/lib/swal";

export default function JoinButton({ eventId, title, ended }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  // null = not known yet (only while a signed-in user's status is loading)
  const [joinedState, setJoined] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isPending || !session) return;
    let live = true;
    apiFetch(`/events/${eventId}/joined`)
      .then((r) => live && setJoined(r.joined))
      .catch(() => live && setJoined(false));
    return () => {
      live = false;
    };
  }, [session, isPending, eventId]);

  const joined = joinedState === true;
  const checking = Boolean(session) && joinedState === null;

  async function join() {
    if (!session) {
      toast("Log in to join this event.", { icon: "🔒" });
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    setBusy(true);
    try {
      await apiFetch(`/events/${eventId}/join`, { method: "POST" });
      setJoined(true);
      router.refresh();
      successAlert("You are in!", `You joined "${title}". Find it anytime under Joined Events.`);
    } catch (err) {
      if (err.status === 409) setJoined(true);
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (ended) {
    return <button className="btn btn-disabled w-full" disabled>This event has ended</button>;
  }
  if (joined) {
    return (
      <button className="btn btn-accent w-full" disabled>
        <FiCheck /> You joined this event
      </button>
    );
  }
  return (
    <button onClick={join} disabled={busy || isPending || checking} className="btn btn-primary w-full">
      {busy || isPending || checking ? <span className="loading loading-spinner loading-sm" /> : "Join Event"}
    </button>
  );
}
