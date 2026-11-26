import { CatalogSkeletonGrid } from '@/components/ui/ShimmerSkeleton';

export default function Loading() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 min-h-[82vh] bg-ifaqa-linen">
      <div className="h-7 w-56 rounded-lg bg-ifaqa-cashmere/80 mb-3 animate-pulse" />
      <div className="h-4 w-96 max-w-full rounded bg-ifaqa-cashmere/60 mb-8 animate-pulse" />
      <CatalogSkeletonGrid count={6} />
    </div>
  );
}
