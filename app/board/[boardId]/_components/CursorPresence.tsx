"use client";

import { memo } from "react";

// import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import { Cursor } from "./Cursor";
import { useOthersConnectionIds } from "@/liveblocks.config";
import { shallow, useOthersMapped } from "@liveblocks/react/suspense";
import { colorToCss } from "@/lib/utils";
import { Path } from "./Path";
// interface CursorPresenceProps {}

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => {
        return (
          <Cursor
            key={connectionId}
            connectionId={connectionId}
          />
        );
      })}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      penciDraft: other.presence.penciDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.penciDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.penciDraft}
              fill={other.penColor ? colorToCss(other.penColor) : "#000"}
            />
          );
        }
      })}
    </>
  );
  return null;
};

export const CursorPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorPresence.displayName = "CursorPresence";
