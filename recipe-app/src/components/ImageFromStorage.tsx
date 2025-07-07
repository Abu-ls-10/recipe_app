// src/components/ImageFromStorage.tsx
'use client';

import Image from 'next/image';

interface ImageFromStorageProps {
  storageId: string;
  alt?: string;
  className?: string;
}

export default function ImageFromStorage({ storageId, alt = '', className = '' }: ImageFromStorageProps) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
  const imageUrl = new URL(`${convexUrl}/getImage`);
  imageUrl.searchParams.set("storageId", storageId);

  return (
    <img
      src={imageUrl.href}
      alt={alt}
      className={className}
      height="300"
      width="400"
      // style={{ width: "auto" }}
    />
  );
}
