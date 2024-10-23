import { cn, colorToCss, getConstrastingTextColor } from "@/lib/utils";
import { NoteLayer } from "@/type/Canvas";
import { useMutation } from "@liveblocks/react";
import { Kalam } from "next/font/google";
import { ContentEditableEvent } from "react-contenteditable";
import ContentEditable from "react-contenteditable";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBaseOnHeight = height * scaleFactor;
  const fontSizeBaseOnWidth = width * scaleFactor;

  return Math.min(maxFontSize, fontSizeBaseOnHeight, fontSizeBaseOnWidth);
};

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}
export function Note({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: NoteProps) {
  const { x, y, width, height, fill, value } = layer;

  const updatValue = useMutation(({ storage }, newValue) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updatValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? colorToCss(fill) : "#eca006",
      }}
      className='shadow-md drop-shadow-xl'
    >
      <ContentEditable
        html={value || "text"}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex items-center justify-center text-center  outline-none",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? getConstrastingTextColor(fill) : "#000",
        }}
      />
    </foreignObject>
  );
}
