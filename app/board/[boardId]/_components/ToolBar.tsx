"use client";
// interface ToolBarProps {}
export function ToolBar() {
  return (
    <div className=' absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <div className=' bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
        <div className=''>Pencil</div>
        <div className=''>Sqare</div>
        <div className=''>Circle</div>
        <div className=''>Ellipsis</div>
      </div>
      <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
        <div className=''>Undo</div>
        <div className=''>Redo</div>
      </div>
    </div>
  );
}
