"use client";

import { useRenameModal } from "@/lib/store/useRenameModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

// interface RenameModalProps {}
export function RenameModal() {
  const { isOpen, onClose, initialvalues } = useRenameModal();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
          <DialogDescription>Enter a new title for board</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
