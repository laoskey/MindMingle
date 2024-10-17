"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useOrganization } from "@clerk/clerk-react";

export function EmptyBoards() {
  const create = useMutation(api.board.create);
  const { organization } = useOrganization();
  function onClick() {
    if (!organization) {
      return;
    }
    create({
      orgId: organization.id,
      title: "Untitled",
    });
  }
  return (
    <div className='h-full flex flex-col justify-center items-center mt-12'>
      <Image
        src={"/edit/note-notepad.svg"}
        alt='empty'
        width={110}
        height={110}
      />
      <h2 className=' text-2xl font-semibold mt-6'>Create your first board</h2>
      <p className=' text-muted-foreground text-sm mt-2'>Start by creating a board for your organization</p>
      <Button
        size={"lg"}
        className='mt-3'
        onClick={onClick}
      >
        Create board
      </Button>{" "}
    </div>
  );
}
