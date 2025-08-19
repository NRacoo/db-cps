const prisma = require("../config/db/server");

const getUserAll = async () => {
    const users = await prisma.user.findMany()
    return users;
}

module.exports = getUserAll;