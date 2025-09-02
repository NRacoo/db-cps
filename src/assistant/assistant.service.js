const prisma = require("../config/db/server")

const GetAssitantByKode = async (kode) => {
    const assistant = await prisma.assistant.findUnique({
        where: {kode: kode}
    })
    return assistant
}

const CreateAssistant = async ({name, kode, major, university, imageUrl, divisi, role, instagram, linkedin, github}) =>{
    const dataExist = await GetAssitantByKode(kode);
    if(dataExist) {
        throw new Error("Asisstant sudah terdaftar");
    }

    const data = await prisma.assistant.create({
        data:{
            name,
            kode,
            major,
            university,
            imageUrl,
            divisi,
            role,
            instagram,
            linkedin,
            github,
        }
    });
    return data;
}

module.exports = {
    GetAssitantByKode,
    CreateAssistant
}