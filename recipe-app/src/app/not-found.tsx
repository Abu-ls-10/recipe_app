// src/app/not-found.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center text-[color:var(--color-text)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-5xl font-extrabold text-[color:var(--color-accent)] mb-4">404</h1>
      <p className="text-lg mb-6 text-opacity-70">Sorry, we couldn&apos;t find that page.</p>
      <Link
        href="/"
        className="px-5 py-2 bg-[color:var(--color-primary)] hover:bg-[color:var(--color-secondary)] text-white rounded transition"
      >
        Go Home
      </Link>
    </motion.div>
  );
}
