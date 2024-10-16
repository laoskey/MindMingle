"use client";

import { useOrganizationList } from "@clerk/clerk-react";
import { Item } from "./Item";

export function List() {
  const { userMemberships } = useOrganizationList({ userMemberships: { infinite: true } });
  if (!userMemberships.data?.length) {
    return null;
  }
  return (
    <ul className='space-y-4'>
      {userMemberships.data?.map((mem) => {
        return (
          <Item
            key={mem.organization.id}
            name={mem.organization.name}
            id={mem.organization.id}
            imageUrl={mem.organization.imageUrl}
          />
        );
      })}
    </ul>
  );
}
