// src/components/RecipeList.tsx
'use client';

import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import RecipeCard from './RecipeCard';

export default function RecipeList() {
  const recipes = useQuery(api.recipes.getRecipes);
  const deleteRecipe = useMutation(api.recipes.deleteRecipe);

  if (!recipes) return <div className="text-center mt-20">Loading recipes...</div>;

  return (
    <section className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[color:var(--color-accent)] mb-6 text-center">
        Your Recipes
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} onDelete={(id) => deleteRecipe({ id })} />
        ))}
      </div>
    </section>
  );
}
