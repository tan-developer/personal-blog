import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const data = await request.json();

  await prisma.post.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.header,
      desc: data.desc,
      content: JSON.stringify(data.content),
      titleImage: data.imageUrl,
      rawContent: data.rawContent,
      updatedAt : new Date()
    },
  });

  return new NextResponse("Updated" , {status : 200 })
}
