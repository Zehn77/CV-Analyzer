import { getClientApiClient, getServerApiClient } from "@/lib/api";
import type {
  CreatePositionData,
  GetPositionsParams,
  Position,
  PositionsResponse,
} from "./positions.types";

export type {
  CreatePositionData,
  GetPositionsParams,
  Pagination,
  Position,
  PositionQuestion,
  PositionUser,
  PositionsResponse,
} from "./positions.types";

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

export async function generateQuestions(
  token: string,
  data: CreatePositionData,
): Promise<string[]> {
  const api = getClientApiClient(token);
  const { data: res } = await api.post("/positions/generate-questions", data);
  return res.data.questions;
}

export async function getPosition(id: string): Promise<Position> {
  const api = await getServerApiClient();
  const { data } = await api.get(`/positions/${id}`);
  return data.data;
}

export async function createPosition(
  token: string,
  data: CreatePositionData,
): Promise<Position> {
  const api = getClientApiClient(token);
  const { data: res } = await api.post("/positions", data);
  return res.data;
}
