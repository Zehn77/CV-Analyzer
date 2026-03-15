import { getClientApiClient } from "@/lib/api";
import type { UsersResponse } from "./users.types";

export type { User, UsersResponse } from "./users.types";

export async function getUsers(token: string): Promise<UsersResponse> {
  const api = getClientApiClient(token);
  const { data } = await api.get("/users", {
    params: { page: 1, limit: 100, role: "USER" },
  });
  return data.data;
}
