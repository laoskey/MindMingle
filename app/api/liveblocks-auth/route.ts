import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { currentUser, auth } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  // Get the current user from your database
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }
  // Start an auth session inside your endpoint

  const userInfo = {
    name: user?.firstName || "Teammeate",
    picture: user?.imageUrl,
  };

  const session = liveblocks.prepareSession(user?.id, {
    userInfo,
  });

  // Use a naming pattern to allow access to rooms with wildcards
  // Giving the user read access on their org, and write access on their group
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }
  // Authorize the user and return the result
  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
