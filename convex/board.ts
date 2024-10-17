import { group } from "console";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

const images = [
  "/placeholders/ani1.svg",
  "/placeholders/ani2.svg",
  "/placeholders/ani3.svg",
  "/placeholders/ani4.svg",
  "/placeholders/ani5.svg",
  "/placeholders/ani6.svg",
  "/placeholders/ani7.svg",
  "/placeholders/ani8.svg",
  "/placeholders/ani9.svg",
  "/placeholders/ani10.svg",
];
export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});
export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }
    //TODO: Later check to delete favorite relations as well
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = ctx.auth.getUserIdentity();
    const title = args.title.trim();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (!title) {
      throw new Error("Title is required");
    }
    if (title.length > 60) {
      throw new Error("Title can not be longer than 60 characters");
    }

    //TODO: Later check to update favorite relations as well
    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });
    return board;
  },
});
