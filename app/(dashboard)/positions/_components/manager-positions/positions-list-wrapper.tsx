import { Suspense } from "react";
import type { PositionsPageProps } from "../../page";
import { PositionsErrorBoundary } from "./positions-error-boundary";
import { PositionsList } from "./positions-list";
import { TriangleAlert } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="flex flex-col overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-14 shrink-0 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 pb-3">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
            <div className="mt-3 flex items-center gap-3">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="ml-auto h-6 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
