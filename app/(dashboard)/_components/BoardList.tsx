"use client";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}
export function BoardList({ orgId, query }: BoardListProps) {
  const data = [];
  if (!data.length && query.search) {
    return <div>Try for searching something else</div>;
  }
  if (!data.length && query.favorites) {
    return <div>You not have any favorites</div>;
  }
  if (!data.length) {
    return <div>No board at all</div>;
  }
  return (
    <div>
      {orgId}:{JSON.stringify(query)}
    </div>
  );
}
