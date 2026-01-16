import { NextRequest, NextResponse } from "next/server";
import { getPageBySlug } from "@/lib/cmsLoader";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  const { slug } = await params;

  try {
    const pageData = await getPageBySlug(slug);

    if (!pageData) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(pageData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
