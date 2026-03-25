import { getPosition } from "@/services/positions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatRelativeTime, getStatusColor } from "@/lib/position-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarChart3, CalendarDays, User } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PositionDetailPage({ params }: Props) {
  const { id } = await params;
  const position = await getPosition(id);
  console.log(position);

  return (
    <div>
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <h1
                className="min-w-0 text-xl font-bold tracking-tight sm:text-2xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {position.title}
              </h1>
              <Badge
                variant="outline"
                className={cn(
                  "shrink-0 capitalize",
                  getStatusColor(position.status),
                )}
              >
                {position.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Created {formatRelativeTime(position.createdAt)}
            </p>
          </div>

          {/* Full JD */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {position.description}
              </p>
            </CardContent>
          </Card>

          {position.questions.length > 0 && (
            <Accordion type="single" collapsible className="mb-6">
              <AccordionItem
                value="qa"
                className="border rounded-lg px-4 last:border-b"
              >
                <AccordionTrigger className="text-sm font-semibold py-3">
                  Clarifying Q&A ({position.questions.length})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3 pb-2">
                    {position.questions.map((qa, i) => (
                      <div key={i} className="rounded-lg bg-muted/50 p-3">
                        <p className="text-sm font-medium">{qa.question}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {qa.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>

        {/* Right sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="flex flex-col gap-4 lg:sticky lg:top-4">
            {/* Metadata */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Position Info
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Posted by:</span>
                  <span className="font-medium">{position.createdBy.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Created:</span>
                  <span className="font-medium">
                    {formatRelativeTime(position.createdAt)}
                  </span>
                </div>

                {position.assignedUsers.length > 0 && (
                  <div className="pt-1">
                    <p className="text-xs text-muted-foreground mb-2">
                      Assigned Developers
                    </p>
                    <div className="flex -space-x-2">
                      {position.assignedUsers.map((user) => (
                        <Tooltip key={user.id}>
                          <TooltipTrigger asChild>
                            <Avatar className="size-8 border-2 border-card">
                              <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                                {user.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>{user.name}</TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button variant="outline" asChild className="w-full">
              <Link href="#">
                <BarChart3 className="mr-1.5 size-4" />
                View Full Insights
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
