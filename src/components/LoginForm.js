"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import AuthShell from "./AuthShell";
import Field, { PasswordInput } from "./Field";
import { authClient } from "@/lib/auth-client";
import { validateLogin } from "@/lib/validators";
import { safeRedirect } from "@/lib/redirect";

export default function LoginForm() {
  const router = useRouter();
  const redirect = safeRedirect(useSearchParams().get("redirect"));
  const { data: session } = authClient.useSession();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) router.replace(redirect);
  }, [session, router, redirect]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const found = validateLogin(form);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0]);
      return;
    }
    setBusy(true);
    const { data, error } = await authClient.signIn.email({
      email: form.email.trim(),
      password: form.password,
    });
    setBusy(false);
    if (error) {
      toast.error(
        error.status === 401 || error.status === 400
          ? "Email or password is incorrect."
          : error.message || "Could not log in. Try again."
      );
      return;
    }
    toast.success(`Welcome back, ${data?.user?.name || "friend"}!`);
    router.replace(redirect);
  }

  async function google() {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirect,
    });
    if (error) toast.error("Google login is not available right now.");
  }

  return (
    <AuthShell
      title="Log in"
      subtitle="Welcome back. Enter your details to continue."
      footer={
        <>
          New to HateHat?{" "}
          <Link href={`/register${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="font-bold text-primary underline underline-offset-4">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field label="Email" id="email" error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} aria-invalid={!!errors.email || undefined} className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`} />
        </Field>
        <Field label="Password" id="password" error={errors.password}>
          <PasswordInput id="password" autoComplete="current-password" value={form.password} onChange={set("password")} invalid={!!errors.password} />
        </Field>
        <button type="submit" disabled={busy} className="btn btn-primary w-full">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Log in"}
        </button>
      </form>
      <div className="divider my-6 text-xs">or</div>
      <button type="button" onClick={google} className="btn btn-outline w-full">
        <FcGoogle size={20} /> Continue with Google
      </button>
    </AuthShell>
  );
}
