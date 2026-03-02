"use client";

import { MobileMenuTrigger } from "./sidebar";

export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4 lg:px-6">
      <MobileMenuTrigger />
    </header>
  );
}
