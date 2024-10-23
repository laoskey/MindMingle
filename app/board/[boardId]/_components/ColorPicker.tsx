"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/type/Canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}
export function ColorPicker({ onChange }: ColorPickerProps) {
  // TODO set color can be in color selector
  return (
    <div className='flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200'>
      <ColorButton
        color={{
          r: 243,
          g: 82,
          b: 95,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 255,
          g: 249,
          b: 177,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 68,
          g: 202,
          b: 99,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 30,
          g: 182,
          b: 235,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 143,
          g: 102,
          b: 245,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 253,
          g: 142,
          b: 42,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 0,
          g: 0,
          b: 0,
        }}
        onClick={onChange}
      />
      <ColorButton
        color={{
          r: 255,
          g: 255,
          b: 255,
        }}
        onClick={onChange}
      />
    </div>
  );
}

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className='w-8 h-8 items-center flex justify-center hover:opacity-75 transition'
      onClick={() => onClick(color)}
    >
      <div
        className='h-8 w-8 rounded-md border border-x-neutral-300 '
        style={{
          background: colorToCss(color),
        }}
      />
    </button>
  );
};
