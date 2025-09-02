const express = require("express");
const getContent = require("./content.repository");
const { createContent, GetContentBySlug, DeleteBySlug, DeleteById } = require("./content.service");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const Contents = await getContent();
        if(!Contents){
            throw new Error("failed get Contents");
            
        }
        res.json({message:"berhasil", data:Contents});

    } catch (error) {
        console.error(error);
    }
});

router.post("/create", async(req, res) => {
    try {
        const user = req.user;
        const {title, content, coverImg, tags} = req.body; 
        const data = await createContent({title, content, coverImg, tags}, user.id);
        res.status(200).json({message: "berhasil membuat konten", data: data});
    } catch (error) {
        console.error(error)
    }
});

router.get("/:slug", async(req, res) => {
    try {
        const {slug} = req.params.slug;
    
        const content = await GetContentBySlug(slug);
        if(!content) {
            throw new Error("content tidak ditemukan");
            
        };
        res.status(200).json({message:"berhasil", data:content});

    } catch (error) {
        res.status(500).json({message:error});
        console.error(error)
    }
});

router.delete("slug/:slug", async (req, res) => {
    try {
        const {slug} = req.params;
    
        const content = await DeleteBySlug(slug);
        if(!content) {
            throw new Error("content tidak ditemukan");
        };
        res.status(200).json({message:"berhasil", data:content});
    } catch (error) {
        res.status(500).json({message:error});
        console.error(error)
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
    
        const content = await DeleteById(id);
        if(!content) {
            throw new Error("content tidak ditemukan");
        };
        res.status(200).json({message:"berhasil", data:content});
    } catch (error) {
        res.status(500).json({message:error});
        console.error(error)
    }
})

module.exports = router;