import { Post } from "@prisma/client";
import prisma from "@/app/libs/prismadb"

const getAllPostByPage = async ({limit = 10, page = 1}) => {
  try {
    const posts : Post[] = await prisma.post.findMany({
      orderBy : {
        createdAt : 'desc'
      },
      skip : (page - 1) * limit,
      take : limit
    }) 
    
    return posts;

  } catch (error) {
    return []
  }

}

export default getAllPostByPage