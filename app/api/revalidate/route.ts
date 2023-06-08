import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get("path");

  const access_token = req.nextUrl.searchParams.get("access_token");


  if (!(tag && access_token)) {
    return new NextResponse("Invalid request", { status: 401 });
  }

  if (access_token !== process.env.REVALIDATE_SECRET_TOKEN) {
    return new NextResponse("Invalid token", { status: 401 });
  }

  if (tag) {
    revalidateTag(tag);
  }
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
