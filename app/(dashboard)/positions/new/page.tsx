"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { JobTitleField } from "./_components/job-title-field";
import { JobDescriptionField } from "./_components/job-description-field";
import { ClarifyingQuestions } from "./_components/clarifying-questions";
import { AssignDevelopers } from "./_components/assign-developers";
import { createPosition, generateQuestions } from "@/services/positions";

export default function CreatePositionPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [jd, setJd] = useState("");
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questions, setQuestions] = useState<
    { question: string; answer: string }[] | null
  >(null);
  const [selectedDevs, setSelectedDevs] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const isValidField = (value: string) => value.trim().length >= 3;

  const handleGenerateQuestions = useCallback(async () => {
    if (!isValidField(jd)) {
      toast.error("Job description must be at least 3 characters");
      return;
    }
    setLoadingQuestions(true);
    setQuestions(null);
    try {
      const result = await generateQuestions(session!.user.accessToken, {
        title,
        description: jd,
      });
      setQuestions(result.map((q) => ({ question: q, answer: "" })));
    } catch {
      toast.error("Failed to generate questions. Please try again.");
    } finally {
      setLoadingQuestions(false);
    }
  }, [title, jd, session]);

  const handleAnswerChange = useCallback((index: number, answer: string) => {
    setQuestions(
      (prev) =>
        prev?.map((q, i) => (i === index ? { ...q, answer } : q)) ?? null,
    );
  }, []);

  const toggleDev = useCallback((devId: string) => {
    setSelectedDevs((prev) =>
      prev.includes(devId) ? prev.filter((d) => d !== devId) : [...prev, devId],
    );
  }, []);

  const handleSubmit = async () => {
    if (!isValidField(title)) {
      toast.error("Job title must be at least 3 characters");
      return;
    }
    if (!isValidField(jd)) {
      toast.error("Job description must be at least 3 characters");
      return;
    }
    setSubmitting(true);
    try {
      const formattedQuestions = (questions ?? []).map((q) => ({
        question: q.question,
        answer: q.answer || null,
      }));
      await createPosition(session!.user.accessToken, {
        title,
        description: jd,
        questions: formattedQuestions,
        assignedUserIds: selectedDevs,
      });
      toast.success("Position created successfully!", {
        description: "Developers will be notified.",
      });
      router.push("/positions");
    } catch {
      toast.error("Failed to create position. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1
          className="text-xl font-bold tracking-tight sm:text-2xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Create Position
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Define a new position and assign developers for CV submission
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <JobTitleField value={title} onChange={setTitle} />

        <JobDescriptionField
          value={jd}
          onChange={setJd}
          onGenerate={handleGenerateQuestions}
          generating={loadingQuestions}
          canGenerate={isValidField(jd)}
        />

        {(loadingQuestions || questions) && (
          <>
            <Separator />
            <ClarifyingQuestions
              loading={loadingQuestions}
              questions={questions}
              onAnswerChange={handleAnswerChange}
            />
          </>
        )}

        <Separator />
        <AssignDevelopers selectedDevs={selectedDevs} onToggle={toggleDev} />

        <Separator />
        <div className="flex justify-end pb-8">
          <Button
            onClick={handleSubmit}
            disabled={submitting || !isValidField(title) || !isValidField(jd)}
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Creating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="size-4" />
                Create Position
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
