'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold mb-6 text-[color:var(--color-accent)]"
      >
        🍽️ Recipe Collection
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg max-w-xl mb-8 text-[color:var(--color-text)] text-opacity-80"
      >
        Discover & save your favorite meals. Minimal, modern, and made with love.
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <Link
          href="/recipes"
          className="px-6 py-3 rounded-lg text-lg font-semibold transition-all
                     bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-secondary)]"
        >
          View Recipes
        </Link>
      </motion.div>
    </main>
  );
}
