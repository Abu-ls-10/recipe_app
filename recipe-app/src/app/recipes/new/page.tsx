// src/app/recipes/new/page.tsx
import RecipeForm from '../../../components/RecipeForm';

export default function NewRecipePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>
      <RecipeForm />
    </main>
  );
}
