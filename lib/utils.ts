import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = ["#DC2628", "#d97706", "#059669", "#7c3aed", "#DB2777"];

export function connectionIdToNumber(pconnectionId: number): string {
  return COLORS[pconnectionId % COLORS.length];
}
