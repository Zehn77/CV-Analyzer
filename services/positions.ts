import { getServerApiClient } from "@/lib/api";

export type Position = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export type PositionsResponse = {
  positions: Position[];
  pagination: Pagination;
};

export type GetPositionsParams = {
  page?: number;
  limit?: number;
  q?: string;
  status?: string;
};

export async function getPositions(
  params: GetPositionsParams = {},
): Promise<PositionsResponse> {
  const { page = 1, limit = 100, q, status } = params;

  const api = await getServerApiClient();
  const { data } = await api.get("/positions", {
    params: {
      page,
      limit,
      ...(q && { q }),
      ...(status && status !== "all" && { status }),
    },
  });
  return data.data;
}
