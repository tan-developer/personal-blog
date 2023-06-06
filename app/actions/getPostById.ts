import prisma from '@/app/libs/prismadb'

const getAllPostById = async (id : string) => {
  try {
    if (!id) {
      throw Error("Invalid ")
    }

    const postById = await prisma.post.findUnique({
      where : {
        id : id
      }
    })

    return postById
  } catch (error) {
    throw Error
  }
}

export default getAllPostById