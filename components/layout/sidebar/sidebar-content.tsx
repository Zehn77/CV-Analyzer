"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SidebarNav } from "./sidebar-nav";
import { SidebarUser } from "./sidebar-user";

export function SidebarContent({
  collapsed,
  onCollapse,
}: {
  collapsed: boolean;
  onCollapse?: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div
        className={cn(
          "flex h-14 items-center gap-3 border-b border-sidebar-border shrink-0",
          collapsed ? "justify-center px-2" : "px-4",
        )}
      >
        <Link
          href="/"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm"
        >
          C
        </Link>
        {!collapsed && (
          <Link
            href="/"
            className="text-base font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            CIP Platform
          </Link>
        )}
        {onCollapse && !collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto size-7 text-sidebar-foreground/60 hover:text-sidebar-foreground"
            onClick={onCollapse}
          >
            <ChevronLeft className="size-4" />
          </Button>
        )}
      </div>

      <SidebarNav collapsed={collapsed} />
      <SidebarUser collapsed={collapsed} />
    </div>
  );
}
