import prisma  from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';


export async function POST(request: Request) { 
  try {
    const body = await request.json()

    if (body.id) {
      const removeImage = await prisma.image.delete({
        where : {
          id : body.id
        }
      })

      return NextResponse.json("Remove Successfully")
    }
  
    return new NextResponse("Invalid Request" , {status : 401})
  } catch (error) {
    return new NextResponse("Internal Error" , {status : 401})
  }
}