import { NextRequest, NextResponse } from "next/server";
import { request } from "graphql-request";
import { GRAPHQL_ENDPOINT, GRAPHQL_HEADERS } from "@/lib/apiConfig";
import { GET_PAGE_DATA } from "@/graphql/queries/pageData";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  const { slug } = await params;

  try {
    const data: any = await request(
      GRAPHQL_ENDPOINT,
      GET_PAGE_DATA,
      { slug },
      GRAPHQL_HEADERS
    );

    return NextResponse.json(data.pages_connection?.nodes[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
