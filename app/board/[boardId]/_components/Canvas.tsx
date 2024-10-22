/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { nanoid } from "nanoid";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useStorage,
  useUpdateMyPresence,
} from "@liveblocks/react/suspense";
import { Info } from "./Info";
import { Perticipants } from "./Perticipants";
import { ToolBar } from "./ToolBar";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from "@/type/Canvas";
import React, { useCallback, useState } from "react";
import { CursorPresence } from "./CursorPresence";
import { pointEventTocavansPoint } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./LayerPreview";

const MAX_LAYERS = 100;

interface CanvasProps {
  boardId: string;
}
export function Canvas({ boardId }: CanvasProps) {
  const layerIds = useStorage((root) => root.layerIds);
  const [canvaState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Reacangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointEventTocavansPoint(e, camera);

    setMyPresence({ cursor: current });
  }, []);

  // const updatePoint = useUpdateMyPresence();
  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointEventTocavansPoint(e, camera);

      console.log({
        point,
        mode: canvaState.mode,
      });
      if (canvaState.mode === CanvasMode.Inserting) {
        insertLayer(canvaState.layertype, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvaState, history, insertLayer]
  );
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

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
      <svg
        className='h-[100vh] w-[100vw]'
        onWheel={onWheel}
        // onPointerMove={(e: React.PointerEvent) => {
        //   const current = pointEventTocavansPoint(e, camera);
        //   updatePoint({ cursor: current });
        // }}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g style={{ transform: `translate(${camera.x}px,${camera.y}px) ` }}>
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={() => {}}
              selectionColor={"#000"}
            />
          ))}

          <CursorPresence />
        </g>
      </svg>
    </main>
  );
}
