"use client";

import { useRenameModal } from "@/lib/store/useRenameModal";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";

// interface RenameModalProps {}
export function RenameModal() {
  const { isOpen, onClose, initialvalues } = useRenameModal();
  const [title, setTitle] = useState(initialvalues.title);
  const { mutate, pending } = useApiMutation(api.board.update);

  useEffect(() => {
    setTitle(initialvalues.title);
  }, [initialvalues.title]);
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({
      id: initialvalues.id,
      title,
    })
      .then(() => {
        onClose();
        toast({
          title: "Board renamed",
        });
      })
      .catch(() => toast({ title: "Failed to rename" }));
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
          <DialogDescription>Enter a new title for board</DialogDescription>

          <form
            onSubmit={onSubmit}
            className=' space-y-4'
          >
            <Input
              disabled={pending}
              required
              maxLength={60}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Board title'
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type='button'
                  variant={"outline"}
                >
                  Cancle
                </Button>
              </DialogClose>

              <Button
                disabled={pending}
                type='submit'
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
