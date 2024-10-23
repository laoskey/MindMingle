/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { nanoid } from "nanoid";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
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
  Side,
  XYWH,
} from "@/type/Canvas";
import React, { useCallback, useMemo, useState } from "react";
import { CursorPresence } from "./CursorPresence";
import {
  connectionIdToColor,
  findIntersetingLayerWithRectangle,
  pointEventTocavansPoint,
  resizeBounds,
} from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./LayerPreview";
import { SelectionBox } from "./SelectionBox";
import { SelectedTools } from "./SelectedTools";

const MAX_LAYERS = Number(process.env.MAX_SHOW_LAYERS) as number;

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

  const unSelectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);
  // const updatePoint = useUpdateMyPresence();
  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointEventTocavansPoint(e, camera);
      if (
        canvaState.mode === CanvasMode.None ||
        canvaState.mode === CanvasMode.Pressinng
      ) {
        unSelectLayers();
        setCanvasState({
          mode: CanvasMode.None,
        });
      } else if (canvaState.mode === CanvasMode.Inserting) {
        insertLayer(canvaState.layertype, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvaState, history, insertLayer, unSelectLayers]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointEventTocavansPoint(e, camera);
      if (canvaState.mode === CanvasMode.Inserting) {
        return;
      }

      // TODO Add case for drawing

      setCanvasState({ origin: point, mode: CanvasMode.Pressinng });
    },
    [camera, canvaState.mode, setCanvasState]
  );
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvaState.mode === CanvasMode.Pencil ||
        canvaState.mode === CanvasMode.Inserting
      ) {
        return;
      }
      history.pause();
      e.stopPropagation();

      const point = pointEventTocavansPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvaState.mode]
  );

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();

      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history]
  );

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvaState.mode !== CanvasMode.Resizing) {
        return;
      }
      const bounds = resizeBounds(
        canvaState.initialBounds,
        canvaState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvaState]
  );

  const translateSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvaState.mode !== CanvasMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - canvaState.current.x,
        y: point.y - canvaState.current.y,
      };
      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [canvaState]
  );
  const startMultiSelection = useCallback(
    (current: Point, origin: Point) => {
      if (
        Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) >
        5
      ) {
        // console.log("ATTEMPING TO SELECTION NET");
        setCanvasState({
          mode: CanvasMode.SelecctionNet,
          origin,
          current,
        });
      }
    },
    []
  );
  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();

      setCanvasState({
        mode: CanvasMode.SelecctionNet,
        origin,
        current,
      });

      const ids = findIntersetingLayerWithRectangle(
        layerIds,
        layers,
        origin,
        current
      );

      setMyPresence({ selection: ids });
    },
    [layerIds]
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointEventTocavansPoint(e, camera);

      if (canvaState.mode === CanvasMode.Pressinng) {
        startMultiSelection(current, canvaState.origin);
      } else if (canvaState.mode === CanvasMode.SelecctionNet) {
        updateSelectionNet(current, canvaState.origin);
      } else if (canvaState.mode === CanvasMode.Translating) {
        translateSelectedLayer(current);
      } else if (canvaState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      }

      setMyPresence({ cursor: current });
    },
    [canvaState, camera, resizeSelectedLayer, translateSelectedLayer]
  );

  const selections = useOthersMapped((other) => other.presence.selection);
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] =
          connectionIdToColor(connectionId);
      }
    }
    return layerIdsToColorSelection;
  }, [selections]);
  // console.log(layerIds);
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
      <SelectedTools
        camera={camera}
        setLastUsedColor={setLastUsedColor}
      />
      <svg
        className='h-[100vh] w-[100vw]'
        onWheel={onWheel}
        // onPointerMove={(e: React.PointerEvent) => {
        //   const current = pointEventTocavansPoint(e, camera);
        //   updatePoint({ cursor: current });
        // }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g
          style={{ transform: `translate(${camera.x}px,${camera.y}px) ` }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox
            onResizeHandlePointerDown={onResizeHandlePointerDown}
          />
          <CursorPresence />
        </g>
      </svg>
    </main>
  );
}
