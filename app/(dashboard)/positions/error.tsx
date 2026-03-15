"use client";

export default function PositionsError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-sm text-muted-foreground">
        Failed to load positions. Please try again.
      </p>
      <button onClick={reset} className="text-sm text-primary hover:underline">
        Try again
      </button>
    </div>
  );
}
