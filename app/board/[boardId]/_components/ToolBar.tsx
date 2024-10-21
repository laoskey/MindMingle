"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./ToolButton";
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react";
import { CanvasState } from "@/type/Canvas";

interface ToolBarProps {
  canvasState: CanvasState;
  setCanvasState: (newSState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}
export function ToolBar({ canvasState, setCanvasState, undo, redo, canRedo, canUndo }: ToolBarProps) {
  return (
    <div className=' absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <div className=' bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
        <ToolButton
          label='select'
          icon={MousePointer2}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label='text'
          icon={Type}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label='Stiky note'
          icon={StickyNote}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label='Rectangle'
          icon={Square}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label='Ellipse'
          icon={Circle}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label='Pen'
          icon={Pencil}
          onClick={() => {}}
          isActive={false}
        />
      </div>
      <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
        <ToolButton
          label='Undo'
          icon={Undo2}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label='Redo'
          icon={Redo2}
          onClick={() => {}}
          isDisable={true}
        />
      </div>
    </div>
  );
}

ToolBar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className='shadow-md rounded-md bg-white h-[360px] w-[52px] absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <Skeleton className=' h-full w-full bg-muted-400' />
    </div>
  );
};
