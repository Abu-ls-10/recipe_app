import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
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
  try {
    const recipes = await ctx.db.query('recipes').collect();

    return await Promise.all(
      recipes.map(async (recipe) => ({
        ...recipe,
        imageUrl: recipe.imageUrl
          ? await ctx.storage.getUrl(recipe.imageUrl as Id<"_storage">)
          : null,
      }))
    );
  } catch (error) {
    console.error('Error in getRecipes:', error);
    throw error;
  }
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
