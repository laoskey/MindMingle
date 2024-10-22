"use client";

import { RectangleLayer } from "@/type/Canvas";
import React from "react";

interface ReacangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}
export function Reacangle({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: ReacangleProps) {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className='drop-shadow-md'
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill='#000'
      stroke='transparent'
    ></rect>
  );
}
