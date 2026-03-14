import { getPositions } from "@/services/positions";

type Props = {
  q?: string;
  status?: string;
};

export async function PositionsList({ q, status }: Props) {
  const { positions } = await getPositions({ q, status });

  if (positions.length === 0) {
    return <p className="text-sm text-muted-foreground">No positions found.</p>;
  }

  return (
    <ul className="space-y-3">
      {positions.map((position) => (
        <li key={position.id}>{position.title}</li>
      ))}
    </ul>
  );
}
