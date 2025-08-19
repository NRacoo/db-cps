const express = require("express");
const getContent = require("./content.repository");
const { createContent } = require("./content.service");
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

module.exports = router;