import { NewButton } from "./NewButton";

export function Sidebar() {
  return (
    <aside className=' fixed z-[1] bg-blue-950 h-full w-[6rem] flex flex-col p-3 gap-y-4 text-white'>
      <NewButton />
    </aside>
  );
}
