"use client";
import { Plus } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "@/components/hint";
import { CreateOrganization } from "@clerk/clerk-react";

export function NewButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className=' aspect-square'>
          <Hint
            label='Create Organization'
            side='right'
            align='start'
            sideOffset={16}
          >
            <button className='bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'>
              <Plus className=' text-white' />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className='p-0 bg-transparent border-none mx-w-[30rem]'>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
}
