// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.header
      className="w-full h-20 bg-[color:var(--glass)] border-b border-[color:var(--color-secondary)] backdrop-blur-lg shadow-md sticky top-0 z-50"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <nav className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-semibold tracking-wide text-[color:var(--color-accent)]">
          Abuzar&apos;s Recipes
        </Link>

        {/* LINKS */}
        <div className="flex gap-6 items-center text-[color:var(--color-text)] text-sm font-medium">
          <Link
            href="/recipes"
            className="px-4 py-2 rounded-full hover:bg-[color:var(--color-secondary)] transition"
          >
            Recipes
          </Link>
          <Link
            href="/recipes/new"
            className="px-4 py-2 rounded-full bg-[color:var(--color-primary)] text-white hover:bg-[color:var(--color-secondary)] transition"
          >
            Add Recipe
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
