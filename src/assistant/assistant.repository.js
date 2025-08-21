const prisma = require("../config/db/server")
const getAllAssistant = async () => {
    const assistants = await prisma.assistant.findMany()

    return assistants
}

module.exports = getAllAssistant;