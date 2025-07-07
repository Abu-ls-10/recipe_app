// src/app/recipes/page.tsx
import RecipeList from '../../components/RecipeList';

export default function RecipesPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>
      <RecipeList />
    </main>
  );
}
