import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { v } from "convex/values";

export const createRecipe = mutation({
  args: {
    title: v.string(),
    ingredients: v.string(),
    instructions: v.string(),
    rating: v.number(),
    imageUrl: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("recipes", args);
  },
});

export const getRecipes = query(async (ctx) => {
  try {
    const recipes = await ctx.db.query("recipes").collect();

    return await Promise.all(
      recipes.map(async (recipe) => ({
        ...recipe,
        imageUrl: recipe.imageUrl
          ? await ctx.storage.getUrl(recipe.imageUrl as Id<"_storage">)
          : null,
      }))
    );
  } catch (error) {
    console.error("Error in getRecipes:", error);
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
    imageUrl: v.optional(v.union(v.id("_storage"), v.null())),
  },
  handler: async (ctx, { id, ...rest }) => {
    const oldRecipe = await ctx.db.get(id);
    if (oldRecipe?.imageUrl && oldRecipe.imageUrl !== rest.imageUrl) {
      await ctx.storage.delete(oldRecipe.imageUrl as Id<"_storage">);
    }
    await ctx.db.patch(id, {
      ...rest,
      imageUrl: rest.imageUrl ?? undefined, // Replace null with undefined
    });
  },
});

export const deleteRecipe = mutation({
  args: { id: v.id("recipes") },
  handler: async (ctx, { id }) => {
    const recipe = await ctx.db.get(id);
    if (recipe?.imageUrl) {
      await ctx.storage.delete(recipe.imageUrl as Id<"_storage">);
    }
    await ctx.db.delete(id);
  },
});
