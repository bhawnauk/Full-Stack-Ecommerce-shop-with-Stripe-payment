import PickleLoader from "./PickleLoader";

interface ProductGridSkeletonProps {
  count?: number;
}

export default function ProductGridSkeleton({
  count = 4,
}: ProductGridSkeletonProps) {
  return (
    <div>
      <div className="mb-8">
        <PickleLoader size="sm" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="animate-fade-up overflow-hidden rounded-2xl border border-sand bg-white"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="shimmer aspect-[4/5]" />
            <div className="space-y-3 p-5">
              <div className="shimmer h-5 w-2/3 rounded" />
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer h-4 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
