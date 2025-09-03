const express = require('express');
const getAllAssistant = require('./assistant.repository');
const { CreateAssistant, GetAssitantByKode } = require('./assistant.service');
const router = express.Router();
const multer = require("multer");
const path = require("path")
const supabase = require("../config/supabase");

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits:{fileSize: 5 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        if(file.mimetype.startsWith("image/")){
            cb(null, true)
        }else{
            cb(new Error("Hanya file gambar yang diizinkan!"), false)
        }
    },
});

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

router.post("/register",  upload.single("imageUrl") ,async(req, res) => {
    try {
        const {
            name,
            kode, 
            major, 
            university,
            divisi, 
            role, 
            instagram, 
            linkedin, 
            github} = req.body;

        let imageUrl = null;
        if(req.file){
            const fileName = `${Date.now()}-${req.file.originalname}`;
            const {data, error} = await supabase.storage
            .from("assistants")
            .upload(fileName, req.file.buffer, {
                contentType:req.file.mimetype,
                upsert:true
            });

            if(error) {throw error};

            const {data: publicUrlData} = supabase.storage
            .from("assistants")
            .getPublicUrl(fileName);

            imageUrl= publicUrlData.publicUrl;
        }

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