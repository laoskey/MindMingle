"use client";

import { memo } from "react";

// import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import { Cursor } from "./Cursor";
import { useOthersConnectionIds } from "@/liveblocks.config";
// interface CursorPresenceProps {}

const Cursors = () => {
  const ids = useOthersConnectionIds();
  console.log(ids);
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

export const CursorPresence = memo(() => {
  return (
    <>
      {/* TODO :Draft pencil */}
      <Cursors />
    </>
  );
});

CursorPresence.displayName = "CursorPresence";
