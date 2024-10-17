"use client";

import { RenameModal } from "@/components/modal/RenameModal";
import { useEffect, useState } from "react";

// interface ModalProviderProps {}

export function ModalProvider() {
  const [isMounted, setIsMounter] = useState(false);

  useEffect(() => {
    setIsMounter(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <RenameModal />
    </>
  );
}
