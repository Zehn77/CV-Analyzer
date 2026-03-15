export type Position = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: "OPEN" | "CLOSED";
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

export type PositionQuestion = {
  question: string;
  answer: string | null;
};

export type CreatePositionData = {
  title: string;
  description: string;
  questions?: PositionQuestion[];
};
