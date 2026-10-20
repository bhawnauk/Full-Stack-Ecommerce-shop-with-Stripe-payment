import { Link } from "react-router-dom";

interface LogoProps {
  inverted?: boolean;
}

export default function Logo({ inverted = false }: LogoProps) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Pickle Co. home">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect x="9" y="3" width="14" height="5" rx="1.5" fill="#e0a93b" />
        <rect
          x="6"
          y="8"
          width="20"
          height="21"
          rx="5"
          fill={inverted ? "#fbf8f2" : "#1f2e23"}
        />
        <ellipse cx="16" cy="18.5" rx="4" ry="6.5" fill="#8fae6b" />
      </svg>

      <span
        className={`font-display text-2xl font-semibold tracking-tight ${
          inverted ? "text-paper" : "text-brine"
        }`}
      >
        Pickle Co.
      </span>
    </Link>
  );
}
