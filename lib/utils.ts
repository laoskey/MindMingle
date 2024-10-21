import { Camera } from "@/type/Canvas";
import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const COLORS = ["#DC2628", "#d97706", "#059669", "#7c3aed", "#DB2777"];
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdToColor(pconnectionId: number): string {
  return COLORS[pconnectionId % COLORS.length];
}

export function pointEventTocavansPoint(e: React.PointerEvent, camera: Camera) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}
