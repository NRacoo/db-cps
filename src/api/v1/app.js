const express = require("express");
const ContentRoutes = require("../../content/content.controller")
const UserRoutes = require("../../users/user.controller");
const AssistantRoutes = require("../../assistant/assistant.controller")

const router = express.Router();

router.use("/content",ContentRoutes);
router.use("/assistant", AssistantRoutes);
router.use("/users" ,UserRoutes);

module.exports = router;