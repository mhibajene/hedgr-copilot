"use client";
import { useEffect, useState } from "react";

export default function DevSecretsToast() {
  if (process.env.NODE_ENV !== "development") return null;
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);
  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 rounded-2xl bg-black/80 text-white px-4 py-2 shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-sm">✅ Secrets loaded from Doppler</span>
        <button
          className="text-xs underline opacity-80 hover:opacity-100"
          onClick={() => setShow(false)}
          aria-label="Dismiss"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
