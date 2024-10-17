import { title } from "process";
import { create } from "zustand";

const defaultValues = { id: "", title: "" };
interface IRenameModal {
  isOpen: boolean;
  initialvalues: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<IRenameModal>((set) => ({
  isOpen: false,
  onOpen: (id, title) => set({ isOpen: true, initialvalues: { id, title } }),
  onClose: () => set({ isOpen: false, initialvalues: defaultValues }),
  initialvalues: defaultValues,
}));
