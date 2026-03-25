"use client";

import { useState } from "react";
import { Menu, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SidebarContent } from "./sidebar-content";

export function MobileMenuTrigger() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 shrink-0 lg:hidden"
        >
          <Menu className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-70 p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SidebarContent collapsed={false} />
      </SheetContent>
    </Sheet>
  );
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative hidden lg:flex h-screen flex-col border-r border-sidebar-border transition-[width] duration-200 shrink-0",
        collapsed ? "w-17" : "w-65",
      )}
    >
      <SidebarContent
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      />
      {collapsed && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-4 z-10 size-7 rounded-full border border-border bg-background text-muted-foreground shadow-sm hover:text-foreground"
          onClick={() => setCollapsed(false)}
        >
          <ChevronLeft className="size-3.5 rotate-180" />
        </Button>
      )}
    </aside>
  );
}
