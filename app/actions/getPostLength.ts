import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb"

export default async function getPostLength() {
  const count = await prisma.post.count();

  return count;
}
