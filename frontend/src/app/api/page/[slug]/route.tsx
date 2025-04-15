// src/app/api/page/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { request, gql } from "graphql-request";
import { GRAPHQL_ENDPOINT, GRAPHQL_HEADERS } from "@/lib/apiConfig";
import { GET_PAGE_DATA } from "@/graphql/queries/pageData";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = await params;

  const pageSlug = slug;

  try {
    const data: any = await request(
      GRAPHQL_ENDPOINT,
      GET_PAGE_DATA,
      { slug: pageSlug },
      GRAPHQL_HEADERS
    );
    return NextResponse.json(data.pages_connection?.nodes[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
