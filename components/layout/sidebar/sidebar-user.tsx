"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SidebarUser({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="shrink-0 border-t border-sidebar-border p-3">
      <div
        className={cn("flex items-center gap-3", collapsed && "justify-center")}
      >
        <Avatar className="size-9 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
            SC
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Sarah Chen</p>
            <Badge
              variant="outline"
              className="mt-0.5 text-[10px] px-1.5 py-0 h-4 capitalize"
            >
              Manager
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
      </div>
    </div>
  );
}
