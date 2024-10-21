"use client";

import { useSelf } from "@liveblocks/react/suspense";
import { Info } from "./Info";
import { Perticipants } from "./Perticipants";
import { ToolBar } from "./ToolBar";

interface CanvasProps {
  boardId: string;
}
export function Canvas({ boardId }: CanvasProps) {
  // const info = useSelf();
  // console.log(info);
  return (
    <main className=' h-full w-full bg-neutral-100 touch-none'>
      <Info boardId={boardId} />
      <Perticipants />
      <ToolBar />
    </main>
  );
}
