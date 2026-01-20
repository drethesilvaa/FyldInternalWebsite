import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const imagePath = searchParams.get("path");
    const quality = parseInt(searchParams.get("quality") || "75");
    const width = parseInt(searchParams.get("width") || "1920");
    const height = parseInt(searchParams.get("height") || "1080");

    if (!imagePath) {
      return NextResponse.json(
        { error: "Missing image path parameter" },
        { status: 400 }
      );
    }

    // Security: prevent path traversal
    const decodedPath = decodeURIComponent(imagePath);
    if (decodedPath.includes("..")) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 }
      );
    }

    // Construct the full file path
    const fullPath = path.join(process.cwd(), "public", decodedPath);

    // Read the image file
    const imageBuffer = await readFile(fullPath);

    // Optimize the image using sharp
    const optimizedBuffer = await sharp(imageBuffer)
      .resize(width, height, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat("webp", { quality })
      .toBuffer();

    // Return the optimized image
    return new NextResponse(Buffer.from(optimizedBuffer), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image optimization error:", error);
    return NextResponse.json(
      { error: "Failed to optimize image" },
      { status: 500 }
    );
  }
}
