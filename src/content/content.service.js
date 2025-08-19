const prisma = require("../config/db/server");

const createContent = async ({title, content, coverImg, tags}, userId) => {
    const tagData = tags.map(tagName => ({
         tag: {
        connectOrCreate: {
          where: { name: tagName }, 
          create: { name: tagName }
        }
      }
    }))
    const newContent= await prisma.content.create({
        data:{
            title,
            content,
            coverImg,
            tags:{
                create:tagData,
            },
            authorId: userId,
        }, include: {
            tags: {
                include: {
                    tag: true
                }
            }
        }
    })
    return newContent
}

module.exports ={
    createContent,
}