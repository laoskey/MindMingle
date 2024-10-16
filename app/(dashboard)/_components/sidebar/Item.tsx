"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";

interface ItemPRops {
  id: string;
  name: string;
  imageUrl: string;
}
export function Item({ id, name, imageUrl }: ItemPRops) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isAcctive = organization?.id == id;

  const onClick = () => {
    if (!setActive) {
      return;
    }
    setActive({ organization: id });
  };
  return (
    <div className=' aspect-square relative'>
      <Hint
        label={name}
        side='right'
        align='start'
        sideOffset={16}
      >
        <Image
          src={imageUrl}
          fill
          alt={name}
          onClick={onClick}
          className={cn("cursor-pointer rounded-md opacity-75 hover:opacity-100 transition", isAcctive && "opacity-100")}
        />
      </Hint>
    </div>
  );
}
