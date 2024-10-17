"use client";

import Image from "next/image";

export function EmptyFavorites() {
  return (
    <div className='h-full flex flex-col justify-center items-center mt-12'>
      <Image
        src={"/edit/like.svg"}
        alt='empty'
        width={140}
        height={140}
      />
      <h2 className=' text-2xl font-semibold mt-6'>Not Favorites boards</h2>
      <p className=' text-muted-foreground text-sm mt-2'>Try favorite a board</p>
    </div>
  );
}
