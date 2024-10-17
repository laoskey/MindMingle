"use client";
import { formatDistanceToNow } from "date-fns";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./Overlay";
import { useAuth } from "@clerk/clerk-react";
import { Footer } from "./Footer";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <Link href={`/board/${id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
        <div className='relative flex-1 bg-amber-50'>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className='object-fit'
          />
          <Overlay />
        </div>
        <Footer
          isFaorite={isfavofite}
          title={title}
          authorLabel={authorLabel}
          createdAtlebal={createdAtLabel}
          onClick={() => {}}
          disabled={false}
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
