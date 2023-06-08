import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { Post } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { limit = 10, page = 1 }: { limit: number; page: number } =
      await request.json();

    const posts: Post[] = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json([]);
  }
}
