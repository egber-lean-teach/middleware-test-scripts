interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded ${className}`}
      style={{ backgroundSize: "200% 100%" }}
    />
  );
}

// Skeleton components for different use cases
export function SkeletonText({ className = "" }: SkeletonProps) {
  return <Skeleton className={`h-4 ${className}`} />;
}

export function SkeletonLine({ className = "" }: SkeletonProps) {
  return <Skeleton className={`h-3 ${className}`} />;
}

export function SkeletonBox({ className = "" }: SkeletonProps) {
  return <Skeleton className={`h-8 ${className}`} />;
}

// Specific skeleton for embedding values
export function EmbeddingValuesSkeleton() {
  return (
    <div className="space-y-4">
      {/* Skeleton for multiple embedding items */}
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="border border-gray-200 rounded-md p-4">
          {/* Title skeleton */}
          <div className="flex items-center justify-between mb-3">
            <SkeletonText className="w-32" />
            <SkeletonText className="w-20" />
          </div>

          {/* Values skeleton - simulating number arrays */}
          <div className="flex flex-wrap gap-2 mb-3">
            {Array.from({ length: 12 }).map((_, valueIndex) => (
              <SkeletonBox key={valueIndex} className="w-16 h-6" />
            ))}
            <SkeletonText className="w-8" />
          </div>

          {/* Dimensions skeleton */}
          <SkeletonLine className="w-28" />
        </div>
      ))}
    </div>
  );
}

// Skeleton for text responses
export function TextResponseSkeleton() {
  return (
    <div className="space-y-3">
      {/* Multiple lines of text skeleton */}
      <SkeletonText className="w-full" />
      <SkeletonText className="w-5/6" />
      <SkeletonText className="w-4/5" />
      <SkeletonText className="w-full" />
      <SkeletonText className="w-3/4" />
      <div className="mt-4">
        <SkeletonText className="w-2/3" />
        <SkeletonText className="w-5/6 mt-2" />
        <SkeletonText className="w-1/2 mt-2" />
      </div>
    </div>
  );
}
