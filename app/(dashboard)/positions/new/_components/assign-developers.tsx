"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";

export type Developer = {
  id: string;
  name: string;
  avatar: string;
  email: string;
};

export const developers: Developer[] = [
  { id: "dev-1", name: "Alex Rivera", avatar: "AR", email: "alex@company.com" },
  {
    id: "dev-2",
    name: "Jordan Park",
    avatar: "JP",
    email: "jordan@company.com",
  },
  {
    id: "dev-3",
    name: "Morgan Lee",
    avatar: "ML",
    email: "morgan@company.com",
  },
  {
    id: "dev-4",
    name: "Casey Quinn",
    avatar: "CQ",
    email: "casey@company.com",
  },
  {
    id: "dev-5",
    name: "Riley Thompson",
    avatar: "RT",
    email: "riley@company.com",
  },
  {
    id: "dev-6",
    name: "Taylor Kim",
    avatar: "TK",
    email: "taylor@company.com",
  },
  {
    id: "dev-7",
    name: "Jamie Nguyen",
    avatar: "JN",
    email: "jamie@company.com",
  },
];

type Props = {
  selectedDevs: string[];
  onToggle: (devId: string) => void;
};

export function AssignDevelopers({ selectedDevs, onToggle }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h2
        className="text-sm font-semibold"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Assign Developers
      </h2>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Select developers to assign to this position
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="mt-2 w-full justify-between text-sm font-normal"
          >
            {selectedDevs.length > 0
              ? `${selectedDevs.length} developer${selectedDevs.length > 1 ? "s" : ""} selected`
              : "Select developers..."}
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search developers..." />
            <CommandList>
              <CommandEmpty>No developers found.</CommandEmpty>
              <CommandGroup>
                {developers.map((dev) => (
                  <CommandItem key={dev.id} onSelect={() => onToggle(dev.id)}>
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        selectedDevs.includes(dev.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {dev.name}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {dev.email}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedDevs.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedDevs.map((devId) => {
            const dev = developers.find((d) => d.id === devId);
            return (
              <Badge key={devId} variant="secondary" className="gap-1 pr-1">
                {dev?.name}
                <button
                  onClick={() => onToggle(devId)}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
                >
                  <X className="size-3" />
                  <span className="sr-only">Remove {dev?.name}</span>
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
