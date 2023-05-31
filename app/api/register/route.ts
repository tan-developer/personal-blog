import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

const inputValidation: (type: string, data: string) => boolean | undefined = (
  type,
  data
) => {
  switch (type) {
    case "email":
      // Email validation regex
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      return emailRegex.test(data);

    case "password":
      // Password validation regex
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      return passwordRegex.test(data);
  }
};

export async function POST(request: Request) {
  const body = await request.json();

  const { email, name, password } = body;

  if (!email || !name || !password) {
    return new NextResponse("Missing info", {
      status: 400,
    });
  }

  if (
    inputValidation("email", email) &&
    inputValidation("password", password)
  ) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    return NextResponse.json(user);
  } else {
    return new NextResponse("Invalid Credentials", {
      status: 400,
    });
  }
}
