"use client";

import { LayerType } from "@/type/Canvas";
import { useStorage } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import { Reacangle } from "./Reacangle";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}
export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return;
    }
    switch (layer.type) {
      case LayerType.Reacangle:
        return (
          <Reacangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );

      default:
        console.log("Unknown layer type");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
