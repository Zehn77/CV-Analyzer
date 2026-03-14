import { Suspense } from "react";
import type { PositionsPageProps } from "../../page";
import { PositionsErrorBoundary } from "./positions-error-boundary";
import { PositionsList } from "./positions-list";
import { TriangleAlert } from "lucide-react";

export default async function PositionsListWrappwer({
  searchParams,
}: PositionsPageProps) {
  const { q, status } = await searchParams;

  return (
    <div className="mt-6">
      <PositionsErrorBoundary fallback={<PositionsListError />}>
        <Suspense
          key={`${q ?? ""}-${status ?? ""}`}
          fallback={<PositionsListSkeleton />}
        >
          <PositionsList q={q} status={status} />
        </Suspense>
      </PositionsErrorBoundary>
    </div>
  );
}

function PositionsListError() {
  return (
    <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      <TriangleAlert className="size-4 shrink-0" />
      Failed to load positions. Please try again later.
    </div>
  );
}

function PositionsListSkeleton() {
  return (
    <ul className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="h-12 rounded-md bg-muted animate-pulse" />
      ))}
    </ul>
  );
}
