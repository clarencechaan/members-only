var express = require("express");
var router = express.Router();

// Require controller module
var message_controller = require("../controllers/messageController");

/* GET new message page. */
router.get("/", message_controller.create_message_get);

/* POST new message page. */
router.post("/", message_controller.create_message_post);

module.exports = router;
