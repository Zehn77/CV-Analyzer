"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, ChevronLeft, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";

const navItems: {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
  badge?: number;
}[] = [
  {
    label: "Positions",
    href: "/positions",
    icon: Briefcase,
    roles: ["MANAGER"],
  },
];

function SidebarContent({
  collapsed,
  onCollapse,
}: {
  collapsed: boolean;
  onCollapse?: () => void;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  const visibleNavItems = navItems.filter((item) =>
    role ? item.roles.includes(role) : false,
  );

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

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {status === "loading"
            ? Array.from({ length: 4 }).map((_, i) => (
                <li key={i}>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5",
                      collapsed && "justify-center px-2",
                    )}
                  >
                    <div className="size-4 w-full shrink-0 rounded bg-sidebar-accent animate-pulse" />
                    {!collapsed && (
                      <div className="h-3.5 w-24 rounded bg-sidebar-accent animate-pulse" />
                    )}
                  </div>
                </li>
              ))
            : visibleNavItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        collapsed && "justify-center px-2",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                      )}
                    >
                      <item.icon className="size-.45 shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <Badge className="h-5 min-w-5 justify-center rounded-full bg-primary text-primary-foreground text-[10px] px-1.5">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                    {collapsed && item.badge && (
                      <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
                    )}
                  </li>
                );
              })}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-sidebar-border p-3">
        <div
          className={cn(
            "flex items-center gap-3",
            collapsed && "justify-center",
          )}
        >
          <Avatar className="size-9 shrink-0">
            <AvatarFallback
              className={cn(
                "text-xs font-semibold",
                status === "loading"
                  ? "bg-sidebar-accent animate-pulse text-transparent"
                  : "bg-primary/10 text-primary",
              )}
            >
              {session?.user?.email?.slice(0, 2).toUpperCase() ?? ""}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-sm font-medium truncate",
                  status === "loading" &&
                    "rounded bg-sidebar-accent animate-pulse text-transparent",
                )}
              >
                {session?.user?.email ?? "\u00A0"}
              </p>
              <Badge
                variant="outline"
                className={cn(
                  "mt-0.5 text-[10px] px-1.5 py-0 h-4 capitalize",
                  status === "loading" &&
                    "w-14 border-transparent bg-sidebar-accent animate-pulse text-transparent",
                )}
              >
                {role?.toLowerCase() ?? "\u00A0"}
              </Badge>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-sidebar-foreground/60 hover:text-destructive"
              onClick={() => signOut()}
            >
              <LogOut className="size-4" />
              <span className="sr-only">Logout</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

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
        "relative hidden lg:flex h-screen flex-col border-r border-sidebar-border transition-all duration-200 shrink-0",
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
