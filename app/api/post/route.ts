import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getSession from "@/app/actions/getSession";

export async function POST(request: Request) {

  const data = await request.json();

    const session = await getSession();

    console.log(session)

    const post = await prisma.post.create({
      data : {
        title : data.header,
        desc : data.desc,
        content : JSON.stringify(data.content),
        titleImage : data.imageUrl,
        rawContent : data.rawContent,
        author : {
          connect : {
            email : session?.user?.email!
          }
        }
      }
    })

    return NextResponse.json(post);

}
