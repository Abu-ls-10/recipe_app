// src/components/RecipeCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Id } from '../../convex/_generated/dataModel';
// import Image from 'next/image';


interface RecipeCardProps {
  recipe: {
    _id: Id<"recipes">;
    title: string;
    ingredients: string;
    instructions: string;
    imageUrl?: string | null;
    rating: number;
  };
  onDelete: (id: Id<"recipes">) => void;
}

export default function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
  return (
    <motion.div
      className="bg-[#1a1a1a] rounded-xl p-5 shadow-md hover:shadow-xl border border-[color:var(--color-secondary)] transition-all"
      whileHover={{ scale: 1.01 }}
    >
      <h2 className="text-2xl font-bold text-[color:var(--color-accent)] mb-3">{recipe.title}</h2>

      {recipe.imageUrl ? (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="rounded-md w-full h-48 object-cover mb-4 border border-[color:var(--color-secondary)]"
          height="300"
          width="auto"
        />
      ) : (
        <div className="w-full h-48 bg-gray-800 text-gray-500 flex items-center justify-center rounded-md">
          No Image
        </div>
      )}

      <p className="text-sm text-[color:var(--color-text)] text-opacity-80 mb-2">
        <strong className="text-[color:var(--color-accent)]">Ingredients:</strong> {recipe.ingredients}
      </p>

      <p className="text-sm text-[color:var(--color-text)] text-opacity-80 mb-2">
        <strong className="text-[color:var(--color-accent)]">Instructions:</strong> {recipe.instructions}
      </p>

      <p className="text-sm mb-4">
        <strong className="text-[color:var(--color-accent)]">Rating:</strong> {recipe.rating}/5
      </p>

      <div className="flex justify-between text-sm">
        <Link
          href={`/recipes/${recipe._id}/edit`}
          className="text-[color:var(--color-accent)] hover:underline"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(recipe._id)}
          className="text-red-400 hover:text-red-600 transition"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
