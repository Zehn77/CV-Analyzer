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
          "flex h-14 items-center border-b border-sidebar-border shrink-0 transition-all duration-200",
          collapsed ? "justify-center px-2 gap-0" : "px-4 gap-3",
        )}
      >
        <Link
          href="/"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm"
        >
          C
        </Link>
        <Link
          href="/"
          className={cn(
            "text-base font-semibold tracking-tight transition-all duration-200 overflow-hidden whitespace-nowrap",
            collapsed
              ? "w-0 opacity-0 invisible"
              : "w-auto opacity-100 visible",
          )}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          CIP Platform
        </Link>
        <div
          className={cn(
            "ml-auto transition-all duration-200",
            collapsed
              ? "w-0 opacity-0 invisible"
              : "w-auto opacity-100 visible",
          )}
        >
          {onCollapse && (
            <Button
              variant="ghost"
              size="icon"
              className="size-7 text-sidebar-foreground/60 hover:text-sidebar-foreground"
              onClick={onCollapse}
            >
              <ChevronLeft className="size-4" />
            </Button>
          )}
        </div>
      </div>

      <SidebarNav collapsed={collapsed} />
      <SidebarUser collapsed={collapsed} />
    </div>
  );
}
