"use client";

import { useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const KEY = "hatehat-theme";

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const read = () => document.documentElement.getAttribute("data-theme") || "hatehat";
const readServer = () => null;

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, readServer);

  function toggle() {
    const next = theme === "hatehat-night" ? "hatehat" : "hatehat-night";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  }

  const dark = theme === "hatehat-night";
  return (
    <button
      type="button"
      onClick={toggle}
      className="btn btn-ghost btn-circle"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
    >
      {theme === null ? <span className="size-5" /> : dark ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  );
}
