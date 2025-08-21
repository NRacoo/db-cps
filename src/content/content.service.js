const prisma = require("../config/db/server");
const getContent = require("./content.repository");

function sluglify(text) {
    return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g," ").replace(/\-\-+/g," ")
}

const createContent = async ({title, content, coverImg, tags}, userId) => {
    const slug = await generateUniqueSlug(title)
    const tagData = tags.map(tagName => ({
         tag: {
        connectOrCreate: {
          where: {name: tagName }, 
          create: {name: tagName }
        }
      }
    }))
    const newContent= await prisma.content.create({
        data:{
            title,
            slug,
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

async function generateUniqueSlug(title){
    let baseSlug = sluglify(title);
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.content.findUnique({where: {slug}})){
        slug = `${baseSlug}-${counter++}`;
    }
    return slug
}

const GetContentBySlug = async (slug) => {
    const data = await prisma.content.findUnique({
        where:{slug}
    });
    return data;
}

const DeleteBySlug = async (slug) => {
    const content = await GetContentBySlug(slug)
    if(!content){
        throw new Error("content tidak ditemukan");
        
    }
    const data  = await prisma.content.delete({
        where:{slug}
    });
    return data;
}

const DeleteById = async(id) => {
    const data = await prisma.content.delete({
        where:{id}
    });
    return data;
}

module.exports ={
    createContent,
    GetContentBySlug,
    DeleteBySlug,
    DeleteById
}