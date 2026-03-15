"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type Question = { question: string; answer: string };

type Props = {
  loading: boolean;
  questions: Question[] | null;
  onAnswerChange: (index: number, answer: string) => void;
};

export function ClarifyingQuestions({
  loading,
  questions,
  onAnswerChange,
}: Props) {
  if (!loading && !questions) return null;

  return (
    <div>
      <h2
        className="text-sm font-semibold"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Clarifying Questions
      </h2>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Answer these AI-generated questions to refine the evaluation criteria
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <Skeleton className="h-9 w-full" />
                </CardContent>
              </Card>
            ))
          : questions?.map((q, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <p className="text-sm font-medium mb-2">{q.question}</p>
                  <Input
                    placeholder="Type your answer..."
                    value={q.answer}
                    onChange={(e) => onAnswerChange(i, e.target.value)}
                  />
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
