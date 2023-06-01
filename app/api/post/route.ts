import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

export async function POST(request: Request) {

  const data = await request.json();

    const currentUser = await prisma.user.findUnique({
      where: {
        email: data.author,
      },
    })

    const post = await prisma.post.create({
      data : {
        title : data.header,
        content : JSON.stringify(data.content),
        titleImage : data.imageUrl,
        author : {
          connect : {
            email : data.author
          }
        }
      }
    })

    return NextResponse.json(post);

}
