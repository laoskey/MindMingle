"use client";

import { UserButton } from "@clerk/clerk-react";
import { SearchInput } from "./SearchInput";

export function Navbar() {
  return (
    <div className='flex items-center gap-x-4 p-5 pl-[2.5rem] '>
      <div className='hidden lg:flex lg:flex-1 '>
        <SearchInput />
      </div>

      <UserButton />
    </div>
  );
}
