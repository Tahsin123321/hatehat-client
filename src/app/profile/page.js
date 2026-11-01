"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import Field from "@/components/Field";
import { authClient } from "@/lib/auth-client";
import { isUrl } from "@/lib/validators";

function ProfileForm({ user }) {
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  async function save(e) {
    e.preventDefault();
    const found = {};
    if (name.trim().length < 2) found.name = "Name must be at least 2 characters.";
    if (image.trim() && !isUrl(image.trim())) found.image = "Enter a valid photo URL starting with http or https.";
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0]);
      return;
    }
    setBusy(true);
    const { error } = await authClient.updateUser({ name: name.trim(), image: image.trim() || null });
    setBusy(false);
    if (error) toast.error(error.message || "Could not update your profile.");
    else toast.success("Profile updated.");
  }

  const initial = (name || user.email)[0]?.toUpperCase();
  return (
    <div className="stitch-inset mt-8 rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
      <div className="flex items-center gap-5">
        {image && isUrl(image) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="size-20 rounded-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <span className="flex size-20 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-content">{initial}</span>
        )}
        <div>
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-sm opacity-70">{user.email}</p>
        </div>
      </div>
      <form onSubmit={save} noValidate className="mt-8 space-y-5">
        <Field label="Display name" id="name" error={errors.name}>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`} />
        </Field>
        <Field label="Profile photo URL" id="image" error={errors.image}>
          <input id="image" type="url" value={image} onChange={(e) => setImage(e.target.value)} className={`input input-bordered w-full ${errors.image ? "input-error" : ""}`} />
        </Field>
        <Field label="Email" id="email" hint="Your email is your sign-in and cannot be changed here.">
          <input id="email" value={user.email} disabled className="input input-bordered w-full" />
        </Field>
        <button type="submit" disabled={busy} className="btn btn-primary">
          {busy ? <span className="loading loading-spinner loading-sm" /> : "Save profile"}
        </button>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  return (
    <PrivateRoute>
      <div className="page-shell section-pad max-w-3xl">
        <h1 className="section-title">Your profile</h1>
        <p className="section-lead mt-3">Update the name and photo other volunteers see.</p>
        {session && <ProfileForm key={session.user.id + session.user.updatedAt} user={session.user} />}
      </div>
    </PrivateRoute>
  );
}
