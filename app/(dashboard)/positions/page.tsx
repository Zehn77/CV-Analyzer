import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ManagerPositions } from "./_components/manager-positions/manager-positions";
import { UserPositions } from "./_components/user-positions";

export type PositionsPageProps = {
  searchParams: Promise<{ q?: string; status?: string }>;
};

export default async function PositionsPage({
  searchParams,
}: PositionsPageProps) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (role === "MANAGER")
    return <ManagerPositions searchParams={searchParams} />;

  return <UserPositions />;
}
