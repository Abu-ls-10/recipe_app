// src/app/recipes/[id]/edit/page.tsx
'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import RecipeForm from '../../../../components/RecipeForm';
import { useParams } from 'next/navigation';

export default function EditRecipePage() {
  const { id } = useParams();
  const recipes = useQuery(api.recipes.getRecipes);
  const recipe = recipes?.find(r => r._id === id);

  if (!recipe) return <div>Loading...</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <RecipeForm
        defaultValues={{
          id: recipe._id,
          title: recipe.title,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          imageUrl: recipe.imageUrl,
          rating: recipe.rating,
        }}
        onSuccess={() => window.location.href = '/recipes'}
      />
    </main>
  );
}
