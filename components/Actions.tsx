"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModel } from "./ConfirmModel";
import { Button } from "./ui/button";
import { useRenameModal } from "@/lib/store/useRenameModal";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}
export function Actions({ children, side, sideOffset, id, title }: ActionsProps) {
  const { mutate, pending } = useApiMutation(api.board.remove);
  const { isOpen, onOpen } = useRenameModal();
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast({ title: "Link copied" }))
      .catch(() => {
        toast({ title: "Failed to copy link" });
      });
  };
  const onDelete = () => {
    mutate({ id })
      .then(() => toast({ title: "success deleted" }))
      .catch(() => toast({ title: "failed to delete" }));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className='w-60'
      >
        <DropdownMenuItem
          className='p-3 cursor-pointer'
          onClick={onCopyLink}
        >
          <Link2 className='h-4 w-4 mr-2' />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className='p-3 cursor-pointer'
          onClick={() => onOpen(id, title)}
        >
          <Pencil className='h-4 w-4 mr-2' />
          Rename
        </DropdownMenuItem>
        <ConfirmModel
          header='Delete board'
          description='This wil delete the board and all of its'
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant={"ghost"}
            className='p-3 cursor-pointer text-sm w-full justify-start font-normal'
            // onClick={onDelete}
          >
            <Trash2 className='h-4 w-4 mr-2' />
            Delete
          </Button>
        </ConfirmModel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
