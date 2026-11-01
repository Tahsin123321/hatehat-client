"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setEmail("");
    toast.success("You are on the list. We will email you about new events.");
  }

  return (
    <section className="bg-secondary text-secondary-content">
      <div className="page-shell section-pad grid items-center gap-8 md:grid-cols-2">
        <div>
          <h2 className="section-title !text-secondary-content">Hear about new events first</h2>
          <p className="mt-3 max-w-md leading-relaxed opacity-80">
            One short email a week with the drives, cleanups and camps planned
            near you. No spam, and you can leave anytime.
          </p>
        </div>
        <form onSubmit={onSubmit} noValidate>
          <label htmlFor="newsletter-email" className="mb-2 block text-sm font-semibold">
            Your email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input input-bordered w-full bg-base-100 text-base-content"
            />
            <button type="submit" className="btn btn-primary sm:w-auto">
              Subscribe
            </button>
          </div>
          {error && <p className="mt-2 text-sm font-semibold text-error-content/90 rounded bg-error px-2 py-1 inline-block">{error}</p>}
        </form>
      </div>
    </section>
  );
}
