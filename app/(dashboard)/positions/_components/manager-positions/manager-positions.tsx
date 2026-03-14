import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PositionsFilters } from "./positions-filters";
import { PositionsPageProps } from "../../page";
import PositionsListWrappwer from "./positions-list-wrapper";

export async function ManagerPositions({ searchParams }: PositionsPageProps) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1
            className="text-2xl font-bold tracking-tight text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Open Positions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse and manage developer position listings
          </p>
        </div>
        <Button asChild>
          <Link href="/positions/new">
            <Plus className="mr-1.5 size-4" />
            Create Position
          </Link>
        </Button>
      </div>

      <PositionsFilters />

      <PositionsListWrappwer searchParams={searchParams} />
    </div>
  );
}
