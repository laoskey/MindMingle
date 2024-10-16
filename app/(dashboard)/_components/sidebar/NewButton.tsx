"use client";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function NewButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className=' aspect-square'>
          <button className='bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'>
            <Plus className=' text-white' />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className='p-0 bg-transparent border-none mx-w-[30rem]'>
        <CreateOrganization routing='hash' />
      </DialogContent>
    </Dialog>
  );
}
