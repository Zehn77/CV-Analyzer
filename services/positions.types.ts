export type PositionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type PositionQuestion = {
  question: string;
  answer: string | null;
};

export type Position = {
  id: string;
  title: string;
  description: string;
  questions: PositionQuestion[];
  status: "OPEN" | "CLOSED";
  createdAt: string;
  updatedAt: string;
  createdBy: PositionUser;
  assignedUsers: PositionUser[];
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

export type CreatePositionData = {
  title: string;
  description: string;
  questions?: PositionQuestion[];
  assignedUserIds?: string[];
};
