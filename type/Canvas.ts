// the comment types of Canvas Comment
export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
  z: number;
};

export enum LayerType {
  Reacangle,
  Ellipse,
  Path,
  Text,
  Note,
}

export type RectangleLayer = {
  type: LayerType.Reacangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};
export type EllipaseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  points: number[][];
  value?: string;
};
export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};
export type NoteLayer = {
  type: LayerType.Note;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  value?: string;
};

export type Point = {
  x: number;
  y: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type XYWH = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | { mode: CanvasMode.Pencil }
  | { mode: CanvasMode.Pressinng; origin: Point }
  | { mode: CanvasMode.SelecctionNet; origin: Point; current?: Point }
  | { mode: CanvasMode.Translating; current: Point }
  | { mode: CanvasMode.Resizing; initialBounds: XYWH; corner: Side }
  | {
      mode: CanvasMode.Inserting;
      layertype:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Reacangle
        | LayerType.Text;
    };

export enum CanvasMode {
  None,
  Pressinng,
  SelecctionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}
