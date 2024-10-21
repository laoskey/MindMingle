"use client";

import { useCanRedo, useCanUndo, useHistory, useSelf } from "@liveblocks/react/suspense";
import { Info } from "./Info";
import { Perticipants } from "./Perticipants";
import { ToolBar } from "./ToolBar";
import { CanvasMode, CanvasState } from "@/type/Canvas";
import { useState } from "react";

interface CanvasProps {
  boardId: string;
}
export function Canvas({ boardId }: CanvasProps) {
  const [canvaState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  return (
    <main className=' h-full w-full bg-neutral-100 touch-none'>
      <Info boardId={boardId} />
      <Perticipants />
      <ToolBar
        canvasState={canvaState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  );
}
