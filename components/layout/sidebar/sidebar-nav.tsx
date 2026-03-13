"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getNavItemsByRole } from "@/constants/nav-items";

export function SidebarNav({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const { data: session } = useSession();

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
  );
}
