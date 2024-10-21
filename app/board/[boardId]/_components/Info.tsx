"use client";

import { Actions } from "@/components/Actions";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/lib/store/useRenameModal";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSpeparator = () => {
  return <div className='text-neutral-300 px-1.5'>|</div>;
};

interface InfoProps {
  boardId: string;
}

export function Info({ boardId }: InfoProps) {
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  const { onOpen } = useRenameModal();

  if (!data) {
    return <InfoSkeleton />;
  }
  return (
    <div className=' absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Hint
        label='Go to board'
        side='bottom'
        sideOffset={10}
      >
        <Button
          variant={"board"}
          className='px-2'
          asChild
        >
          <Link href={"/"}>
            <Image
              src={"/icon.jpg"}
              alt='logo'
              height={40}
              width={40}
            />
            <span
              className={cn("font-semibold text-xl ml-2 text-black", font.className)}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSpeparator />
      <Hint
        label='Edit title'
        side='bottom'
        sideOffset={10}
      >
        <Button
          variant={"board"}
          className='text-base px-2 font-normal'
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>{" "}
      <TabSpeparator />
      <Actions
        id={data._id}
        title={data.title}
        sideOffset={10}
        side='bottom'
      >
        <div>
          <Hint
            label='Main menu'
            side='bottom'
            sideOffset={10}
          >
            <Button
              asChild
              size={"icon"}
              variant={"board"}
            >
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
}

export function InfoSkeleton() {
  return (
    <div className='w-[300px] absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Skeleton className=' h-full w-full bg-muted-400' />
    </div>
  );
}
