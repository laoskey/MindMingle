"use client";

import { UserButton } from "@clerk/clerk-react";

export function Navbar() {
  return (
    <div className='flex items-center gap-x-4 p-5 pl-[2.5rem] bg-green-300'>
      <div className='hidden lg:flex lg:flex-1 bg-yellow-200'>Search</div>

      <UserButton />
    </div>
  );
}
