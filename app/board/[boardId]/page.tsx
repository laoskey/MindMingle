"use client";

import { Room } from "@/components/Room";
import { Canvas } from "./_components/Canvas";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}
export default function BoardIdPage({ params }: BoardIdPageProps) {
  return (
    <Room
      roomId={params.boardId}
      fallback={<div>Loading ...</div>}
    >
      <Canvas boardId={params.boardId} />;
    </Room>
  );
}
