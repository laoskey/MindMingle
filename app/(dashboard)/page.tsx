"use client";
import { useOrganization } from "@clerk/clerk-react";
import { EmptyOrg } from "./_components/EmptyOrg";
import { BoardList } from "./_components/BoardList";

interface DashBoardProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

function DashboardPage({ searchParams }: DashBoardProps) {
  const { organization } = useOrganization();
  return (
    <div className='p-8 flex-1 h-[calc(100vh-80px)]'>
      {!organization ? (
        <EmptyOrg />
      ) : (
        <p>
          <BoardList
            orgId={organization.id}
            query={searchParams}
          />
        </p>
      )}
    </div>
  );
}

export default DashboardPage;
