"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface FooterProps {
  isFaorite: boolean;
  title: string;
  authorLabel?: string;
  createdAtlebal: string;
  onClick: () => void;
  disabled: boolean;
}

export function Footer({ isFaorite, disabled, title, authorLabel, createdAtlebal, onClick }: FooterProps) {
  return (
    <div className='relative bg-white p-3'>
      <p className='text-[13px] truncate max-w-[calc(100%-20px)]'>{title}</p>

      <p className=' truncate opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground'>
        {authorLabel},{createdAtlebal}
      </p>
      <button
        className={cn(
          " opacity-0 group-hover:opacity-100 absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star className={cn("h-4 w-4 ", isFaorite && "text-blue-600 fill-blue-600")} />
      </button>
    </div>
  );
}
