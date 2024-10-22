"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/type/Canvas";

interface RoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}
export function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      throttle={16}
    >
      {/* <LiveblocksProvider publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}> */}
      <RoomProvider
        id={roomId}
        initialPresence={{
          cursor: null,
          selection: [],
        }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]), //TODO: may add the username next
        }}
      >
        <ClientSideSuspense fallback={fallback}>{() => children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
