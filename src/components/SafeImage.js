"use client";

import { useState } from "react";
import { LogoMark } from "./Logo";

// Event thumbnails are URLs typed in by users, so a broken link must not break the card.
export default function SafeImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-base-200 text-base-content/40 ${className}`}
        role="img"
        aria-label={alt}
      >
        <LogoMark size={44} />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
