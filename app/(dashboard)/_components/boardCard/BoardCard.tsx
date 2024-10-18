"use client";
import { formatDistanceToNow } from "date-fns";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./Overlay";
import { useAuth } from "@clerk/clerk-react";
import { Footer } from "./Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/Actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string | undefined;
  createdAt: string | number;
  orgId: number | string;
  isfavofite: boolean;
}

export function BoardCard({ id, title, imageUrl, authorId, authorName, createdAt, orgId, isfavofite }: BoardCardProps) {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(api.board.favorite);
  const { mutate: onUnFavorite, pending: pendingUnFavorite } = useApiMutation(api.board.unfavorite);

  function toggleFavorite() {
    if (isfavofite) {
      onUnFavorite({ id }).catch(() => toast({ title: "Failed to remove favorite" }));
    } else {
      onFavorite({ id, orgId }).catch(() => toast({ title: "Failed to add favorite" }));
    }
  }
  return (
    <Link href={`/`}>
      {/* <Link href={`/board/${id}`}> */}
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
        <div className='relative flex-1 bg-amber-50'>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className='object-fit'
          />
          <Overlay />
          <Actions
            id={id}
            title={title}
            side='right'
          >
            <button className=' absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
              <MoreHorizontal className=' text-white opacity-75 hover:opacity-100 transition-opacity' />
            </button>
          </Actions>
        </div>
        <Footer
          isFaorite={isfavofite}
          title={title}
          authorLabel={authorLabel}
          createdAtlebal={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnFavorite}
        />
      </div>
    </Link>
  );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className=' aspect-[100/127] rounded-lg overflow-hidden'>
      <Skeleton className='h-full w-full' />
    </div>
  );
};
