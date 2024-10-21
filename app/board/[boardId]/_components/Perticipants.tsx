"use client";

import { Skeleton } from "@/components/ui/skeleton";

// interface PerticipantsProps {}
export function Perticipants() {
  return <div className='absolute top-2 h-12 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>List of the users</div>;
}
Perticipants.Skeleton = function PerticipantsSkeleton() {
  return (
    <div className='w-[100px] absolute top-2 h-12 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      <Skeleton className=' h-full w-full bg-muted-400' />
    </div>
  );
};
