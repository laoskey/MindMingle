"use client";
import Link from "next/link";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });
export function Orgsidebar() {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  return (
    <div className='hidden h-screen   lg:flex flex-col space-y-6 w-[13rem] pl-8 pt-5 ml-2'>
      <Link href={"/"}>
        <div className=' flex items-center gap-x-2  '>
          <Image
            src={"/icon.jpg"}
            alt='logo'
            height={60}
            width={60}
            className=' rounded-full  '
          />{" "}
          <span className={cn(" font-semibold text-2xl z-10", font.className)}>MindM</span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: { display: "flex", justifyContent: "center", alignItems: "center", width: "100%" },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7eb",
              justifyContent: "center",
              backgroundColor: "white",
              height: "50px",
            },
          },
        }}
      />
      <div className=' space-1 w-full'>
        <Button
          asChild
          variant={favorites ? "ghost" : "secondary"}
          size={"lg"}
          className=' font-normal justify-center  w-full px-2'
        >
          <Link href={"/"}>
            <LayoutDashboard className=' h-4 w-4 mr-2' /> Team &nbsp;&nbsp;&nbsp;boards
          </Link>
        </Button>
        <Button
          asChild
          variant={favorites ? "secondary" : "ghost"}
          size={"lg"}
          className=' font-normal justify-center  w-full px-2'
        >
          <Link href={{ pathname: "/", query: { favorites: true } }}>
            <Star className='h-4 w-4 mr-2' /> Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  );
}
