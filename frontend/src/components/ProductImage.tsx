import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

// Falls back to a branded jar illustration when a product image fails to load.
export default function ProductImage({
  src,
  alt,
  className = "",
  loading,
}: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid place-items-center bg-cream ${className}`}
      >
        <svg viewBox="0 0 32 32" className="h-1/3 w-1/3 opacity-80">
          <rect x="9" y="3" width="14" height="5" rx="1.5" fill="#e0a93b" />
          <rect x="6" y="8" width="20" height="21" rx="5" fill="#1f2e23" />
          <ellipse cx="16" cy="18.5" rx="4" ry="6.5" fill="#8fae6b" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setFailedSrc(src)}
      className={className}
    />
  );
}
