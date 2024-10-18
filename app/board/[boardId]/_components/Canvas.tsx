"use client";

import { Info } from "./Info";
import { Perticipants } from "./Perticipants";
import { ToolBar } from "./ToolBar";

interface CanvasProps {
  boardId: string;
}
export function Canvas({ boardId }: CanvasProps) {
  return (
    <main className=' h-full w-full bg-neutral-100 touch-none'>
      <Info />
      <Perticipants />
      <ToolBar />
    </main>
  );
}
