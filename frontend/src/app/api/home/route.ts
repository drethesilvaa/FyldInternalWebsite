import { NextResponse } from "next/server";
import { getHomeData } from "@/lib/cmsLoader";

export async function GET() {
  try {
    const homeData = await getHomeData();

    if (!homeData) {
      return NextResponse.json(
        { error: "Home data not found" },
        { status: 404 }
      );
    }

    // Return wrapped in 'home' key to match what useHomeData expects
    return NextResponse.json({ home: homeData });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch home", err },
      { status: 500 }
    );
  }
}
