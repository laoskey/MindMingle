import Image from "next/image";

function Loading() {
  return (
    <div className=' h-full w-full flex flex-col justify-center items-center'>
      <Image
        alt='logo'
        width={120}
        height={120}
        src={"/icon.jpg"}
        className=' animate-pulse duration-700'
      />
    </div>
  );
}

export default Loading;
