import { NextRequest, NextResponse } from "next/server";
import { request, gql } from "graphql-request";
import { GRAPHQL_ENDPOINT, GRAPHQL_HEADERS } from "@/lib/apiConfig";
import { GET_FOOTER_DATA } from "@/graphql/queries/footerData";

export async function GET(req: NextRequest) {
  try {
    const data = await request(
      GRAPHQL_ENDPOINT,
      GET_FOOTER_DATA,
      GRAPHQL_HEADERS
    );

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch footer" },
      { status: 500 }
    );
  }
}
