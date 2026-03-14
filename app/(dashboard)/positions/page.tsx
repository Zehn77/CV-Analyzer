import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ManagerPositions } from "./components/manager-positions";
import { UserPositions } from "./components/user-positions";

export default async function PositionsPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (role === "MANAGER") return <ManagerPositions />;

  return <UserPositions />;
}
