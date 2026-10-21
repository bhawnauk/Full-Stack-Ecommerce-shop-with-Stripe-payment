import { useEffect, useId, useState } from "react";

const defaultMessages = [
  "Brining the cucumbers…",
  "Adding a pinch of dill…",
  "Picking the crunchiest jars…",
  "Tightening the lids…",
  "Giving the jars a shake…",
];

// The live API sleeps when idle, so the first request can take a while.
const SLOW_AFTER_MS = 6000;

interface PickleLoaderProps {
  messages?: string[];
  size?: "sm" | "lg";
}

export default function PickleLoader({
  messages = defaultMessages,
  size = "lg",
}: PickleLoaderProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => setMessageIndex((index) => (index + 1) % messages.length),
      2200,
    );
    const timeout = setTimeout(() => setSlow(true), SLOW_AFTER_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [messages.length]);

  const isLarge = size === "lg";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center ${
        isLarge ? "flex-col text-center" : "gap-4"
      }`}
    >
      <PickleJar className={isLarge ? "h-32 w-28" : "h-16 w-14 shrink-0"} />

      <div className={isLarge ? "mt-6" : ""}>
        <p
          key={messageIndex}
          className={`animate-message font-display font-semibold text-brine ${
            isLarge ? "text-2xl" : "text-lg"
          }`}
        >
          {messages[messageIndex]}
        </p>

        {slow && (
          <p className="mt-1 animate-message text-sm text-muted">
            Waking up the pickle cellar. The first visit can take a few
            seconds.
          </p>
        )}
      </div>
    </div>
  );
}

function PickleJar({ className }: { className: string }) {
  const clipId = useId();

  return (
    <svg
      viewBox="0 0 120 140"
      className={`pickle-loader ${className}`}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="26" y="30" width="68" height="96" rx="15" />
        </clipPath>
      </defs>

      <rect
        x="22"
        y="26"
        width="76"
        height="104"
        rx="18"
        fill="#ffffff"
        stroke="#1f2e23"
        strokeWidth="4"
      />

      <g clipPath={`url(#${clipId})`}>
        <g className="brine">
          <path
            className="wave"
            d="M0 64 q10 -7 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 V140 H0 Z"
            fill="#c9d9a8"
          />
        </g>

        <circle className="bubble" cx="40" cy="118" r="2.5" fill="#ffffff" />
        <circle className="bubble" cx="78" cy="120" r="2" fill="#ffffff" />
        <circle className="bubble" cx="60" cy="122" r="3" fill="#ffffff" />

        <ellipse
          className="pickle"
          cx="48"
          cy="96"
          rx="9"
          ry="20"
          fill="#8fae6b"
          stroke="#6f8f4f"
          strokeWidth="2"
        />
        <ellipse
          className="pickle"
          cx="72"
          cy="100"
          rx="8"
          ry="17"
          fill="#7a9c58"
          stroke="#5f7d43"
          strokeWidth="2"
        />
      </g>

      <rect
        x="32"
        y="40"
        width="6"
        height="44"
        rx="3"
        fill="#ffffff"
        opacity="0.7"
      />

      <g className="lid">
        <rect x="30" y="8" width="60" height="18" rx="4" fill="#e0a93b" />
        <path
          d="M40 12v10M50 12v10M60 12v10M70 12v10M80 12v10"
          stroke="#a5633a"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}
