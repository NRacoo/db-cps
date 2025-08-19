const prisma = require("../config/db/server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerAdmin = async ({name, email, password}) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
            role:"Admin",
        }
    });
    return admin;
}

const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {email: email},
    });
    return user;
}

const loginAdmin = async({email, password}) => {
    const user = await findUserByEmail(email);
    if(!user){
        throw new Error("error admin tidak ditemukan");
        
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword){
        throw new Error("password salah");
    };
    const payload ={
        id:user.id,
        email:user.email,
        role:user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN, {expiresIn:'1h'});
    console.log("token: ", token, process.env.JWT_TOKEN)
    return ({message:"berhasil login", token})
}

module.exports = {
    registerAdmin,
    loginAdmin,
}