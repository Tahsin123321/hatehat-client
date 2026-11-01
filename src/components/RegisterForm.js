"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import AuthShell from "./AuthShell";
import Field, { PasswordInput } from "./Field";
import { authClient } from "@/lib/auth-client";
import { validateRegister } from "@/lib/validators";
import { safeRedirect } from "@/lib/redirect";

export default function RegisterForm() {
  const router = useRouter();
  const redirect = safeRedirect(useSearchParams().get("redirect"));
  const { data: session } = authClient.useSession();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) router.replace(redirect);
  }, [session, router, redirect]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const input = (key) => `input input-bordered w-full ${errors[key] ? "input-error" : ""}`;

  async function onSubmit(e) {
    e.preventDefault();
    const found = validateRegister(form);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0]);
      return;
    }
    setBusy(true);
    const { error } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      image: form.photoURL.trim(),
    });
    setBusy(false);
    if (error) {
      toast.error(
        /exist/i.test(error.message || "")
          ? "An account with this email already exists. Try logging in."
          : error.message || "Could not create your account. Try again."
      );
      return;
    }
    toast.success(`Account created. Welcome to HateHat, ${form.name.trim()}!`);
    router.replace(redirect);
  }

  async function google() {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: redirect });
    if (error) toast.error("Google login is not available right now.");
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join events and post your own. It takes a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link href={`/login${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="font-bold text-primary underline underline-offset-4">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field label="Name" id="name" error={errors.name}>
          <input id="name" autoComplete="name" value={form.name} onChange={set("name")} className={input("name")} />
        </Field>
        <Field label="Email" id="email" error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} className={input("email")} />
        </Field>
        <Field label="Photo URL" id="photoURL" error={errors.photoURL} hint="Link to a profile picture, for example from your social account.">
          <input id="photoURL" type="url" value={form.photoURL} onChange={set("photoURL")} className={input("photoURL")} />
        </Field>
        <Field label="Password" id="password" error={errors.password} hint="At least 6 characters with one uppercase and one lowercase letter.">
          <PasswordInput id="password" autoComplete="new-password" value={form.password} onChange={set("password")} invalid={!!errors.password} />
        </Field>
        <button type="submit" disabled={busy} className="btn btn-primary w-full">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Create account"}
        </button>
      </form>
      <div className="divider my-6 text-xs">or</div>
      <button type="button" onClick={google} className="btn btn-outline w-full">
        <FcGoogle size={20} /> Continue with Google
      </button>
    </AuthShell>
  );
}
