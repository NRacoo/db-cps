const prisma = require("../config/db/server")

const getContent = async() => {
    const data = await prisma.content.findMany();
    return data;
}

module.exports = getContent