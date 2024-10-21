"use client";

import { Loader } from "lucide-react";
import { InfoSkeleton } from "./Info";
import { PerticipantsSkeleton } from "./Perticipants";
import { ToolbarSkeleton } from "./ToolBar";

// interface COnvasLoadingProps {}
export function ConvasLoading() {
  return (
    <main className=' h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'>
      <Loader className=' h-6 w-6 text-muted-foreground animate-spin' />
      <InfoSkeleton />
      <PerticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  );
}
