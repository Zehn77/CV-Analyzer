"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getNavItemsByRole } from "@/constants/nav-items";

function SidebarNavSkeleton({ collapsed }: { collapsed: boolean }) {
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      <ul className="flex flex-col gap-1">
        {[1, 2, 3, 4].map((i) => (
          <li key={i}>
            <div
              className={cn(
                "flex items-center rounded-xl px-3 py-1.5 transition-all duration-200",
                collapsed ? "justify-center px-2 gap-0" : "gap-3",
              )}
            >
              <Skeleton className="size-8 shrink-0 rounded-lg bg-sidebar-accent" />
              <div
                className={cn(
                  "flex-1 transition-all duration-200 overflow-hidden",
                  collapsed
                    ? "max-w-0 opacity-0 invisible"
                    : "max-w-full opacity-100 visible",
                )}
              >
                <Skeleton className="h-8 w-full rounded-lg bg-sidebar-accent" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SidebarNav({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") return <SidebarNavSkeleton collapsed={collapsed} />;

  const navItems = getNavItemsByRole(session?.user?.role ?? "");

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      <ul className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  collapsed ? "justify-center px-2 gap-0" : "gap-3",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="size-4.5 shrink-0" />
                <div
                  className={cn(
                    "flex-1 flex items-center gap-3 transition-all duration-200 overflow-hidden",
                    collapsed
                      ? "max-w-0 opacity-0 invisible"
                      : "max-w-full opacity-100 visible",
                  )}
                >
                  <span className="flex-1 whitespace-nowrap">{item.label}</span>
                  {item.badge && (
                    <Badge className="h-5 min-w-5 justify-center rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 shrink-0">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
              {collapsed && item.badge && (
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
