interface ProductGridSkeletonProps {
  count?: number;
}

export default function ProductGridSkeleton({
  count = 4,
}: ProductGridSkeletonProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-sand bg-white"
        >
          <div className="aspect-[4/5] bg-cream" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-2/3 rounded bg-cream" />
            <div className="h-4 w-full rounded bg-cream" />
            <div className="h-4 w-1/2 rounded bg-cream" />
          </div>
        </div>
      ))}
    </div>
  );
}
