"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { title } from "process";
interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export function NewBoardButton({ disabled, orgId }: NewBoardButtonProps) {
  const { mutate, pending } = useApiMutation(api.board.create);
  const onClick = () => {
    mutate({ orgId, title: "Untitled" })
      .then(
        (id) => toast({ title: "Board created", duration: 1000 })
        // TODO Redirected to /board/id
      )
      .catch(() => toast({ title: "Failed to create board" }));
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-600 flex flex-col items-center justify-center py-6",
        (disabled || pending) && "opacity-75 cursor-not-allowed hover:bg-blue-600"
      )}
    >
      <Plus className='h-12 w-12 text-white stroke-1' />
      <p className='text-sm text-white font-light'>New board</p>
    </button>
  );
}
