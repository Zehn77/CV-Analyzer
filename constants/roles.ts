export const ROLES = ["USER", "MANAGER", "ADMIN"] as const;
export type Role = (typeof ROLES)[number];

export const REGISTER_ROLES = ROLES.filter((r) => r !== "ADMIN");
