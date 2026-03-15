"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatRelativeTime, getStatusColor } from "@/lib/position-utils";
import { Position } from "@/services/positions.types";

export function PositionCard({ position }: { position: Position }) {
  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="min-w-0 text-base font-semibold leading-snug text-card-foreground line-clamp-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {position.title}
          </h3>
          <Badge
            variant="outline"
            className={cn(
              "shrink-0 text-[11px] capitalize",
              getStatusColor(position.status),
            )}
          >
            {position.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {position.description}
        </p>
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <FileText className="size-3 shrink-0" />
            {position.assignedUsers.length} assigned
          </span>
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(position.createdAt)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-auto px-2 text-primary hover:text-primary"
            asChild
          >
            <Link href={`/positions/${position.id}`}>
              View details
              <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
