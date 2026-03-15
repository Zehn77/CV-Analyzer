import { Briefcase, Bell, LucideIcon } from "lucide-react";
import { Role } from "./roles";
import { ROUTE_PERMISSIONS } from "./route-permissions";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  roles: Role[];
};

const NAV_CONFIG: Omit<NavItem, "roles">[] = [
  { label: "Positions", href: "/positions", icon: Briefcase },
  { label: "Notifications", href: "/notifications", icon: Bell, badge: 3 },
];

export const NAV_ITEMS: NavItem[] = NAV_CONFIG.map((item) => ({
  ...item,
  roles: (ROUTE_PERMISSIONS.find((r) => r.href === item.href)?.roles ??
    []) as Role[],
}));

export function getNavItemsByRole(role: string): NavItem[] {
  return NAV_ITEMS.filter((item) => item.roles.includes(role as Role));
}
