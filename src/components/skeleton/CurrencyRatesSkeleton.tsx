export default function CurrencyRatesSkeleton() {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="size-9 animate-pulse rounded-lg bg-bg" />

            <div className="space-y-1.5">
              <div className="h-3 w-20 animate-pulse rounded bg-bg" />
              <div className="h-2.5 w-10 animate-pulse rounded bg-bg" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="mr-auto h-3 w-20 animate-pulse rounded bg-bg" />
            <div className="mr-auto h-2.5 w-10 animate-pulse rounded bg-bg" />
          </div>
        </div>
      ))}
    </div>
  );
}
