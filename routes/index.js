var express = require("express");
var router = express.Router();

// Require controller modules.
var user_controller = require("../controllers/userController");
var message_controller = require("../controllers/messageController");

// GET home page.
router.get("/", message_controller.index);

module.exports = router;
