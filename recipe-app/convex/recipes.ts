import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRecipe = mutation({
  args: {
    title: v.string(),
    ingredients: v.string(),
    instructions: v.string(),
    rating: v.number(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("recipes", args);
  },
});

export const getRecipes = query(async (ctx) => {
  return await ctx.db.query("recipes").collect();
});

export const updateRecipe = mutation({
  args: {
    id: v.id("recipes"),
    title: v.string(),
    ingredients: v.string(),
    instructions: v.string(),
    rating: v.number(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...rest }) => {
    await ctx.db.patch(id, rest);
  },
});

export const deleteRecipe = mutation({
  args: { id: v.id("recipes") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
