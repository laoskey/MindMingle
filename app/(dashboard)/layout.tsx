import React from "react";
import { Sidebar } from "./_components/sidebar";
import { Orgsidebar } from "./_components/Orgsidebar";
import { Navbar } from "./_components/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className=' h-full'>
      <Sidebar />

      <div className=' h-full pl-16'>
        <div className='flex gap-x-3 h-full'>
          {/* <div className='flex  h-full'> */}
          <Orgsidebar />
          <div className='flex-1 h-full'>
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardLayout;
