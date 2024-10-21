"use client";

import { Room } from "@/components/Room";
import { Canvas } from "./_components/Canvas";
import { ConvasLoading } from "./_components/ConvasLoading";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}
export default function BoardIdPage({ params }: BoardIdPageProps) {
  return (
    <Room
      roomId={params.boardId}
      fallback={<ConvasLoading />}
    >
      <Canvas boardId={params.boardId} />;
    </Room>
  );
}
