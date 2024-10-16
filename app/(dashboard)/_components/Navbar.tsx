"use client";

import { useOrganization, UserButton } from "@clerk/clerk-react";
import { SearchInput } from "./SearchInput";
import { InviteButton } from "./InviteButton";

export function Navbar() {
  const { organization } = useOrganization();
  return (
    <div className='flex items-center gap-x-4 p-5 pl-[2.5rem] '>
      <div className='hidden lg:flex lg:flex-1 '>
        <SearchInput />
      </div>
      {organization && <InviteButton />}

      <UserButton />
    </div>
  );
}
