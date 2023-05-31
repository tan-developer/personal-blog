import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { Image } from "@prisma/client";

export async function POST(request: Request) {
  try {
    var newImage: Image;
    const body = await request.json();

    const currentUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    

    if (body.url && currentUser?.name) {
      newImage = await prisma.image.create({
        data: {
          url: body.url,
          author: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      });
    } else {
      return new NextResponse("InternalError", { status: 500 });
    }

    return NextResponse.json(newImage)
  } catch (error) {
    return new NextResponse("InternalError", { status: 500 });
  }
}
