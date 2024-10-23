"use client";

import { colorToCss } from "@/lib/utils";
import { EllipaseLayer } from "@/type/Canvas";

interface EllipaseProps {
  id: string;
  layer: EllipaseLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}
export function Ellipase({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: EllipaseProps) {
  return (
    <ellipse
      className='drop-shadow-md'
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(
            ${layer.x}px,
            ${layer.y}px
        )`,
      }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      fill={layer.fill ? colorToCss(layer.fill) : "#000"}
      stroke={selectionColor || "transparent"}
      strokeWidth={"1"}
    />
  );
}
