import { NextResponse } from "next/server";
import { getFooterData } from "@/lib/cmsLoader";

export async function GET() {
  try {
    const footerData = await getFooterData();

    if (!footerData) {
      return NextResponse.json(
        { error: "Footer data not found" },
        { status: 404 }
      );
    }

    // Return wrapped in 'footer' key to match what useFooterData expects
    return NextResponse.json({ footer: footerData });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch footer", err },
      { status: 500 }
    );
  }
}
