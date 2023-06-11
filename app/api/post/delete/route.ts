import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const {id} = await request.json();

  await prisma.post.delete({
    where : {
      id : id
    }
  })

  return new NextResponse("Deleted" , {status : 200})
}