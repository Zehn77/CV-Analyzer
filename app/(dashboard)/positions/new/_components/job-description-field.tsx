"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  generating: boolean;
  canGenerate: boolean;
};

export function JobDescriptionField({
  value,
  onChange,
  onGenerate,
  generating,
  canGenerate,
}: Props) {
  return (
    <div>
      <Label htmlFor="jd" className="text-sm font-semibold">
        Job Description
      </Label>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Paste or type the job description
      </p>
      <Textarea
        id="jd"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe the role, requirements, responsibilities..."
        className="mt-2 min-h-50 text-sm leading-relaxed"
        rows={8}
      />
      <Button
        variant="outline"
        className="mt-3"
        onClick={onGenerate}
        disabled={generating || !canGenerate}
      >
        <Sparkles className="mr-1.5 size-4" />
        Generate Clarifying Questions
      </Button>
    </div>
  );
}
