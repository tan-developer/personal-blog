import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"

export async function POST(request: Request) {

  const data = await request.json();
  console.log(data)
    const post = await prisma.post.create({
      data : {
        title : data.header,
        desc : data.desc,
        content : JSON.stringify(data.content),
        titleImage : data.imageUrl,
        rawContent : data.rawContent,
        author : {
          connect : {
            email : data.author
          }
        }
      }
    })

    return NextResponse.json(post);

}
