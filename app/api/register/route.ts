import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, name, password } = body;

  if (!email || !name || !password) {
    return new NextResponse("Missing info", {
      status: 400,
    });
  }

  console.log(email , name , password)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });

  return NextResponse.json(user);
}
