"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ToolButton } from "./ToolButton";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import { CanvasMode, CanvasState, LayerType } from "@/type/Canvas";

interface ToolBarProps {
  canvasState: CanvasState;
  setCanvasState: (newSState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}
export function ToolBar({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canRedo,
  canUndo,
}: ToolBarProps) {
  return (
    <div className=' absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <div className=' bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
        <ToolButton
          label='select'
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelecctionNet ||
            canvasState.mode === CanvasMode.Pressinng ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label='text'
          icon={Type}
          onClick={() =>
            setCanvasState({ mode: CanvasMode.Inserting, layertype: LayerType.Text })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layertype === LayerType.Text
          }
        />
        <ToolButton
          label='Stiky note'
          icon={StickyNote}
          onClick={() =>
            setCanvasState({ mode: CanvasMode.Inserting, layertype: LayerType.Note })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layertype === LayerType.Note
          }
        />
        <ToolButton
          label='Rectangle'
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layertype: LayerType.Reacangle,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layertype === LayerType.Reacangle
          }
        />
        <ToolButton
          label='Ellipse'
          icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layertype: LayerType.Ellipse,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layertype === LayerType.Ellipse
          }
        />
        <ToolButton
          label='Pen'
          icon={Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
      </div>
      <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
        <ToolButton
          label='Undo'
          icon={Undo2}
          onClick={undo}
          isActive={false}
          isDisable={!canUndo}
        />
        <ToolButton
          label='Redo'
          icon={Redo2}
          onClick={redo}
          isDisable={!canRedo}
        />
      </div>
    </div>
  );
}

export function ToolbarSkeleton() {
  return (
    <div className='shadow-md rounded-md bg-white h-[360px] w-[52px] absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <Skeleton className=' h-full w-full bg-muted-400' />
    </div>
  );
}
