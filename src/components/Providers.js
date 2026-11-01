"use client";

import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            background: "var(--color-neutral)",
            color: "var(--color-neutral-content)",
            border: "1px solid var(--color-secondary)",
          },
        }}
      />
    </>
  );
}
