import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

http.route({
  path: "/getImage",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    console.log("Received getImage request");

    const { searchParams } = new URL(request.url);
    const storageId = searchParams.get("storageId");

    if (!storageId) {
      console.warn("No storageId provided in request");
      return new Response("Missing storageId parameter", { status: 400 });
    }

    console.log("Fetching storageId:", storageId);

    const blob = await ctx.storage.get(storageId as Id<"_storage">);

    if (!blob) {
      console.warn(`No blob found for storageId: ${storageId}`);
      return new Response("Image not found", { status: 404 });
    }

    const contentType = blob.type || "application/octet-stream";
    console.log(`Serving blob for ${storageId} with content-type: ${contentType}`);

    return new Response(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }),
});

export default http;
