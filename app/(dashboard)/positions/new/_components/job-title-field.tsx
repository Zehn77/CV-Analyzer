"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function JobTitleField({ value, onChange }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor="title" className="text-sm font-semibold">
          Job Title
        </Label>
        <span className="text-[10px] tabular-nums text-muted-foreground uppercase tracking-wider">
          {value.trim().length} / 3 min
        </span>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Enter the title of the position
      </p>
      <Input
        id="title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Senior Frontend Developer"
        className="mt-2"
      />
    </div>
  );
}
