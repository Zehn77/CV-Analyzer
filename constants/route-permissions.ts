import { Role } from "./roles";

export const ROUTE_PERMISSIONS: { href: string; roles: Role[] }[] = [
  { href: "/positions", roles: ["USER", "MANAGER"] },
  { href: "/notifications", roles: ["USER", "MANAGER"] },
];
