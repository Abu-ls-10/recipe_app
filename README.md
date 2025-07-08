# Recipe Collection App

A minimal, full-stack recipe manager built with Next.js 15 (App Router), Convex, and Tailwind CSS. Users can add, view, edit, and delete recipes. Each recipe includes a title, ingredients, instructions, an optional image, and a 1–5 rating.

Designed with a dark, modern interface and deployed using Vercel and Convex Cloud.

---

## Features

- Add, edit, and delete recipes
- Upload and display recipe images via Convex storage
- Dark theme UI with color palette:
  - **Jet Black** `#121212` background
  - **Ivory** `#F5F5F5` text highlights
  - **Chocolate Brown** `#4E342E` accents
  - **Burgundy** `#8E3B46` for interactive elements
  - **Gold** `#FFD700` for subtle highlights and ratings
- Minimalist, responsive layout with accessible contrast
- Deployed frontend (Vercel) and backend (Convex Cloud)

---

## Technologies Used

- [Next.js 15](https://nextjs.org) (App Router)
- [Convex](https://convex.dev) (Database and File Storage)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com) (Deployment)

---

## Getting Started

### 1. Clone the Repository

```bash
git https://github.com/Abu-ls-10/recipe_app
cd recipe_app/recipe-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env.local` file:

```bash
touch .env.local
```

Fill in the required values, especially:

```env
NEXT_PUBLIC_CONVEX_URL=https://brilliant-butterfly-790.convex.cloud
```

### Run Dev Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Live Deployment

- Recipe App (Vercel): [https://recipe-app-azure-eta.vercel.app/](https://recipe-app-azure-eta.vercel.app/)  
- Database (Convex Cloud): [https://brilliant-butterfly-790.convex.cloud](https://brilliant-butterfly-790.convex.cloud)

---

## Learning Reflection

This project was an insightful dive into using Convex with Next.js 15. While the core CRUD functionality was straightforward, the biggest challenge came with handling image uploads and rendering them properly.

### Challenges & Solutions

- **Serving images from Convex**  
  I initially tried the HTTP request strategy listed in the Convex docs to fetch and render images using `/getImage?storageId=...`. It was over complicating things and thus more bugs. Eventually, I switched to using `ctx.storage.getUrl()` inside my query, making image rendering a lot easier.

- **Non-image recipes**  
  Ensuring the app didn’t break when users submitted a recipe without an image was a simple fix — I just allowed `imageUrl` to be `null` using `v.optional(v.union(v.id("_storage"), v.null()))`.

- **Convex file storage & schema conflicts**  
  Early on, I mistakenly tried to store full image URLs in Convex, which broke things because Convex expects a `Id<"_storage">`. I fixed this by only storing the storage ID and generating a URL at query time using `ctx.storage.getUrl()`.

- **Schema validation issues**  
  I ran into a few `ArgumentValidationError` issues due to mismatched validators between `schema.ts` and the mutation args. Aligning the validators to allow for optional/null image IDs resolved this.

- **Next.js image rendering**  
  For `next/image` to work, I had to explicitly add Convex’s cloud domain to the `next.config.js` under `images.domains`, so I stuck to using <img>.

### What I Learned

- Convex's storage system is simple and powerful but requires strict type conformity. Using storage IDs instead of URLs helped clarify the flow of uploading and serving files.
- Next.js 15’s App Router is flexible but slower to spin up, especially when debugging. Turbopack significantly improved the dev experience.
- A clean schema and validator structure from the beginning helps avoid many silent bugs later.

### Time Spent

- **Total time:** ~4 hours  
  - Core app implementation (CRUD, schema definition, basic app structure): ~1 hour  
  - Styling and UX polish: ~10–15 mins  
  - Debugging + startup issues: ~2+ hours  
  - Image serving problem alone: ~40 minutes  
  - Additional time was spent restarting the app and DB, resolving WSL/Node compatibility issues on Windows, and configuring the hosting setup.

Overall, this was a rewarding project that deepened my understanding of Convex's storage and schema systems, and gave me good practice with Next.js 15's latest architecture.
