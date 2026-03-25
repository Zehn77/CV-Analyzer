"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <div className="flex items-center justify-between">
        <Label htmlFor="jd" className="text-sm font-semibold">
          Job Description
        </Label>
        <span
          className={cn(
            "text-[10px] tabular-nums uppercase tracking-wider",
            value.trim().length < 100
              ? "text-muted-foreground"
              : "text-emerald-600 font-medium",
          )}
        >
          {value.trim().length} / 100 min
        </span>
      </div>
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
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          onClick={onGenerate}
          disabled={generating || !canGenerate}
        >
          <Sparkles className="mr-1.5 size-4" />
          Generate Clarifying Questions
        </Button>
        {!canGenerate && value.trim().length > 0 && (
          <p className="text-[11px] text-muted-foreground italic">
            Add at least {100 - value.trim().length} more characters to enable
            AI.
          </p>
        )}
      </div>
    </div>
  );
}
