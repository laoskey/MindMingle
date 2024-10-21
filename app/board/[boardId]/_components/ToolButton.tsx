"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisable?: boolean;
}
export function ToolButton({ label, icon: Icon, isActive, isDisable, onClick }: ToolButtonProps) {
  return (
    <Hint
      side='right'
      label={label}
      sideOffset={14}
    >
      <Button
        size={"icon"}
        disabled={isDisable}
        onClick={onClick}
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
}
