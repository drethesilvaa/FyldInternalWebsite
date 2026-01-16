import { NextResponse } from "next/server";
import { getNavbarData, getHomeData, getAllPages } from "@/lib/cmsLoader";

export async function GET() {
  try {
    const [navbarData, homeData, allPages] = await Promise.all([
      getNavbarData(),
      getHomeData(),
      getAllPages(),
    ]);

    if (!navbarData) {
      return NextResponse.json(
        { error: "Navbar data not found" },
        { status: 404 }
      );
    }

    // Return combined structure that hooks expect
    return NextResponse.json({
      ...navbarData,
      home: homeData || {},
      pages: (allPages || []).map((page: any) => ({
        id: page.id,
        Title: page.Title,
        slug: page.slug,
        ParentPage: page.ParentPage || null,
      })),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch navbar", err },
      { status: 500 }
    );
  }
}
