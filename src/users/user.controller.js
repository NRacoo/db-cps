const express =require("express");
const getUserAll = require("./user.repository");
const { registerAdmin, loginAdmin } = require("./user.service");
const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const users = await getUserAll();
        if(!users) {
            throw new Error("user tidak ditemukan");
            
        };
        res.json({status: 200, message:"berhasil", data:users})
        
    } catch (error) {
        console.error(error);
    };
});

route.post("/admin/register", async (req, res) => {
    try {
        const {name, email, password} = req.body
        const admin = await registerAdmin({name, email, password});
        if(!admin) {
            throw new Error("gagal register sebagai admin");
            
        }
        res.json({status:200, message:"berhasil mendaftar", data:admin})
        
    } catch (error) {
        console.error(error)
    }
});

route.post("/admin/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const data = await loginAdmin({email, password})
        res.json({status: 200, message:"berhasil login", user:data})
    } catch (error) {
        console.error(error);
    }
})



module.exports = route;