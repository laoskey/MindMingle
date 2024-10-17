"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/clerk-react";

import Image from "next/image";

export function EmptyOrg() {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <div className=' grid grid-cols-2 gap-4'>
        <Image
          src='/edit/format-brush.svg'
          alt=''
          height={200}
          width={200}
        />
        <Image
          src='/edit/circle-five.svg'
          alt=''
          height={200}
          width={200}
        />
        <Image
          src='/edit/pen.svg'
          alt=''
          height={200}
          width={200}
        />
        <Image
          src='/edit/line-chart.svg'
          alt=''
          height={200}
          width={200}
        />
      </div>
      <h2 className=' text-2xl font-semibold mt-6'>Welecome to MindMingle</h2>
      <p className='text-muted-foreground text-sm my-2'>Create an organization to get started</p>
      <div className=' mt-6'>
        <Dialog>
          <DialogTrigger>
            <Button>Create Organization</Button>
          </DialogTrigger>
          <DialogContent className='p-0 bg-transparent border-none max-w-[480px]'>
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
