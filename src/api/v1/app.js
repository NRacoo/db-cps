const express = require("express");
const ContentRoutes = require("../../content/content.controller")
const UserRoutes = require("../../users/user.controller");
const AssistantRoutes = require("../../assistant/assistant.controller")
const { verifyToken, verifyAdmin } = require("../../middlewares/admin.middleware");

const router = express.Router();

router.use("/content",verifyToken, verifyAdmin,ContentRoutes);
router.use("/assistant", verifyToken, verifyAdmin, AssistantRoutes);
router.use("/users" ,UserRoutes);

module.exports = router;