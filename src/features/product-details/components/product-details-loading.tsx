import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Separator } from '@/features/base/components/ui/separator';
import { Skeleton } from '@/features/base/components/ui/skeleton';

export default function ProductDetailsLoading() {
  return (
    <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Product Images Skeleton */}
      <div className="space-y-4">
        <Skeleton className="aspect-square h-80 w-full rounded-lg" />
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-20 flex-shrink-0 rounded-md" />
          ))}
        </div>
      </div>

      {/* Product Details Skeleton */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-32 rounded-md" />
        </div>

        <Skeleton className="mb-2 h-10 w-3/4" />

        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="mb-6 flex items-center gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>

        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-6 h-4 w-3/4" />

        <div className="mb-8 flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-48" />
            </div>
          ))}
        </div>

        <Separator className="mb-6" />

        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          <Skeleton className="h-12 flex-1 rounded-full" />
        </div>
      </div>
    </div>
  );
}
