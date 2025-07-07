'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Id } from '../../convex/_generated/dataModel';

interface RecipeFormProps {
  defaultValues?: {
    id: Id<"recipes">;
    title: string;
    ingredients: string;
    instructions: string;
    imageUrl: string;
    rating: number;
  };
  onSuccess?: () => void;
}

export default function RecipeForm({ defaultValues }: RecipeFormProps) {
  const [title, setTitle] = useState(defaultValues?.title || '');
  const [ingredients, setIngredients] = useState(defaultValues?.ingredients || '');
  const [instructions, setInstructions] = useState(defaultValues?.instructions || '');
  const [rating, setRating] = useState(defaultValues?.rating || 1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [] = useState(defaultValues?.imageUrl || '');

  const createRecipe = useMutation(api.recipes.createRecipe);
  const updateRecipe = useMutation(api.recipes.updateRecipe);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const handleImageUpload = async () => {
    if (!imageFile) return defaultValues?.imageUrl ?? null;
    const uploadUrl = await generateUploadUrl();
    const res = await fetch(uploadUrl, {
      method: 'POST',
      body: imageFile,
    });
    const { storageId } = await res.json();
    return storageId;
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.promise(
      (async () => {
        const uploadedImageId = await handleImageUpload();
        const data = {
          title,
          ingredients,
          instructions,
          imageUrl: uploadedImageId,
          rating,
        };

        if (defaultValues?.id) {
          await updateRecipe({ id: defaultValues.id, ...data });
        } else {
          await createRecipe(data);
        }

        router.push('/recipes'); // Navigate after success

        // if (onSuccess) onSuccess();
      })(),
      {
        loading: defaultValues?.id ? 'Updating recipe...' : 'Creating recipe...',
        success: defaultValues?.id ? 'Recipe updated!' : 'Recipe created!',
        error: 'Something went wrong!',
      }
    );
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 p-6 bg-[#1a1a1a] rounded-xl border border-[color:var(--color-secondary)] shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-[color:var(--color-accent)]">
        {defaultValues?.id ? 'Edit Recipe' : 'Create Recipe'}
      </h2>

      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
        className="w-full p-3 rounded bg-[#0f0f0f] border border-gray-700 text-white placeholder-gray-400"
      />

      <textarea
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}
        placeholder="Ingredients"
        required
        rows={3}
        className="w-full p-3 rounded bg-[#0f0f0f] border border-gray-700 text-white placeholder-gray-400"
      />

      <textarea
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
        placeholder="Instructions"
        required
        rows={4}
        className="w-full p-3 rounded bg-[#0f0f0f] border border-gray-700 text-white placeholder-gray-400"
      />

      <input
        type="number"
        value={rating}
        min={1}
        max={5}
        onChange={e => setRating(Number(e.target.value))}
        className="w-full p-3 rounded bg-[#0f0f0f] border border-gray-700 text-white"
      />

      <input
        type="file"
        accept="image/*"
        onChange={e => setImageFile(e.target.files?.[0] || null)}
        className="w-full text-sm text-gray-400"
      />

      <button
        type="submit"
        className="w-full py-3 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-secondary)] text-white rounded-lg font-semibold transition"
      >
        {defaultValues?.id ? 'Update Recipe' : 'Create Recipe'}
      </button>
    </motion.form>
  );
}
