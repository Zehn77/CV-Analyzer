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
      <Label htmlFor="title" className="text-sm font-semibold">
        Job Title
      </Label>
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
