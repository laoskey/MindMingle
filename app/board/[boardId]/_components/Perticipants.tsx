"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOthers, useSelf, useUser } from "@liveblocks/react/suspense";
import { UserAvatar } from "./UserAvatar";
import { on } from "events";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOW_USERS = 2;
// interface PerticipantsProps {}
export function Perticipants() {
  const users = useOthers();
  const currentUser = useSelf();

  const hasMoreUSers = users.length > MAX_SHOW_USERS;

  return (
    <div className='absolute top-2 h-12 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      <div className='flex gap-x-2'>
        {users.slice(0, MAX_SHOW_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={connectionIdToColor(connectionId)}
              src={info.picture}
              key={connectionId}
              name={info.name}
              fallback={info?.name?.[0] || "Teammate"}
            />
          );
        })}
        {currentUser && (
          <UserAvatar
            borderColor={connectionIdToColor(currentUser.connectionId)}
            src={currentUser.info.picture}
            name={`${currentUser.info.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}
        {hasMoreUSers && (
          <UserAvatar
            name={`${users.length - MAX_SHOW_USERS} more`}
            fallback={`+${users.length - MAX_SHOW_USERS}`}
          />
        )}
      </div>
    </div>
  );
}
export function PerticipantsSkeleton() {
  return (
    <div className='w-[100px] absolute top-2 h-12 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      <Skeleton className=' h-full w-full bg-muted-400' />
    </div>
  );
}
