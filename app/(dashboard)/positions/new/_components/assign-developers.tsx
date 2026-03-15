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
import { getUsers } from "@/services/users";
import type { User } from "@/services/users.types";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Props = {
  selectedDevs: string[];
  onToggle: (userId: string) => void;
};

export function AssignDevelopers({ selectedDevs, onToggle }: Props) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!session?.user.accessToken) return;
    getUsers(session.user.accessToken).then(({ users }) => setUsers(users));
  }, [session]);

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
                {users.map((user) => (
                  <CommandItem key={user.id} onSelect={() => onToggle(user.id)}>
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        selectedDevs.includes(user.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {user.name}
                    <span className="ml-auto text-xs text-muted-foreground">
                      {user.email}
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
          {selectedDevs.map((userId) => {
            const user = users.find((u) => u.id === userId);
            return (
              <Badge key={userId} variant="secondary" className="gap-1 pr-1">
                {user?.name}
                <button
                  onClick={() => onToggle(userId)}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
                >
                  <X className="size-3" />
                  <span className="sr-only">Remove {user?.name}</span>
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
