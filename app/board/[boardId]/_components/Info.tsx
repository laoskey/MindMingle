"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface InfoProps {
  boardId: string;
}
export function Info({ boardId }: InfoProps) {
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) {
    return Info.Skeleton;
  }
  return (
    <div className=' absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Button>
        <Image
          src={"/icon.jpg"}
          alt='logo'
          height={40}
          width={40}
        />
      </Button>
    </div>
  );
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className='w-[300px] absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Skeleton className=' h-full w-full bg-muted-400' />
    </div>
  );
};
