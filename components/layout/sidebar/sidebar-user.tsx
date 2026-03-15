"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function SidebarUserSkeleton({ collapsed }: { collapsed: boolean }) {
  return (
    <>
      <Skeleton className="size-9 rounded-full shrink-0 bg-sidebar-accent" />
      {!collapsed && (
        <>
          <div className="flex-1 min-w-0 flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-24 rounded bg-sidebar-accent" />
            <Skeleton className="h-3 w-14 rounded bg-sidebar-accent" />
          </div>
          <Skeleton className="size-8 rounded-md shrink-0 bg-sidebar-accent" />
        </>
      )}
    </>
  );
}

export function SidebarUser({ collapsed }: { collapsed: boolean }) {
  const { data: session, status } = useSession();

  const name = session?.user?.name ?? "";
  const role = session?.user?.role ?? "";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="shrink-0 border-t border-sidebar-border p-3">
      <div
        className={cn(
          "flex h-9 items-center gap-3",
          collapsed && "justify-center",
        )}
      >
        {status === "loading" ? (
          <SidebarUserSkeleton collapsed={collapsed} />
        ) : (
          <>
            <Avatar className="size-9 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm ml-0.5 font-medium truncate">{name}</p>
                <Badge
                  variant="outline"
                  className="mt-0.5 text-[10px] px-1.5 py-0 h-4 capitalize"
                >
                  {role.toLowerCase()}
                </Badge>
              </div>
            )}
            {!collapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0 text-sidebar-foreground/60 hover:text-destructive"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="size-4" />
                <span className="sr-only">Logout</span>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
