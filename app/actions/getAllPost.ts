import { NextResponse } from 'next/server';
import { User } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb"
import { nextTick } from 'process';


const getAllPost = async () => {
  try {
    const user = await getCurrentUser();


    const post = await prisma.post.findMany({
      where : {
        authorId : user?.id
      }
    })

    return post


    
  } catch (error) {
    return [];
  }

}

export default getAllPost