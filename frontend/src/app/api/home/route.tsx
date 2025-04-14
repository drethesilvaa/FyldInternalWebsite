// /app/api/news/route.ts (App Router)
// or /pages/api/news.ts (Pages Router)
import { NextRequest, NextResponse } from "next/server";
import { request, gql } from "graphql-request";
import { GRAPHQL_ENDPOINT, GRAPHQL_HEADERS } from "@/lib/apiConfig";
import { GET_HOME_DATA } from "@/graphql/queries/homeData";

export async function GET(req: NextRequest) {
  try {
    const data = await request(
      GRAPHQL_ENDPOINT,
      GET_HOME_DATA,
      GRAPHQL_HEADERS
    );

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
