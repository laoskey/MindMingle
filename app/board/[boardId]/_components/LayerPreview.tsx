"use client";

import { LayerType } from "@/type/Canvas";
import { useStorage } from "@liveblocks/react/suspense";
import React, { memo } from "react";

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
        return <div className=''>Reacangle</div>;
      //   case LayerType.Ellipse:
      //     return <div className=''>Ellipase</div>;
      //   case LayerType.Path:
      //     return <div className=''>path</div>;
      //   case LayerType.Text:
      //     return <div className=''>text</div>;
      //   case LayerType.Note:
      //     return <div className=''>text</div>;

      default:
        console.log("Unknown layer type");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
