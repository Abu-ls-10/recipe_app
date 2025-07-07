import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  recipes: defineTable({
    title: v.string(),              
    ingredients: v.string(),        
    instructions: v.string(),       
    rating: v.number(),             
    imageUrl: v.optional(v.string()) 
  }),
});
