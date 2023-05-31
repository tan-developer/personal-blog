import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import { Image } from "@prisma/client";


export async function POST(request: Request) {
  try {
    const { email, limit }: { email: string; limit: string } =
      await request.json();


    const user = await prisma.user.findUnique({
      where : {
        email : email
      }
    })

    const imageArr : Image[] = await prisma.image.findMany({
      where : {
        authorId : user?.id
      }
    })


    if (imageArr) return NextResponse.json(imageArr)

    return [];
    
  } catch (error) {
    return new NextResponse("InternalError", { status: 500 });
  }
}
