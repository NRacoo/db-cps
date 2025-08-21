const express = require('express');
const getAllAssistant = require('./assistant.repository');
const { CreateAssistant, GetAssitantByKode } = require('./assistant.service');
const router = express.Router();

router.get("/", async (req, res)=> {
    try {
        const data = await getAllAssistant()
        if(!data) {
            throw new Error("Data failed");
            
        }
        res.status(200).json({Assistant: data})
    } catch (error) {
        console.error(error);
    }
    
});

router.post("/register", async(req, res) => {
    try {
        const {
            name,
            kode, 
            major, 
            university, 
            imageUrl, 
            divisi, 
            role, 
            instagram, 
            linkedin, 
            github} = req.body;
        const data = await CreateAssistant({name, kode, major, university, imageUrl, divisi, role, instagram, linkedin, github});

        res.status(200).json({message: "berhasil", data: data});
        
    } catch (error) {
        res.status(500).json({message:error});
        console.error(error)
    }

 
});

router.get("/:kode", async (req,res) => {
    try {
        const {kode} = req.params;
        const data = await GetAssitantByKode(kode);

        if(!data) {
            throw new Error("kode tidak ditemukan");
            
        };
        res.status(200).json({message: "berhasil", data: data});
        
    } catch (error) {
        res.status(500).json({message: error});
        console.error(error);
    }
})

module.exports = router;