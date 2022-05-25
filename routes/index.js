var express = require("express");
var router = express.Router();

// Require controller modules.
var user_controller = require("../controllers/userController");
var message_controller = require("../controllers/messageController");

// GET home page.
router.get("/", message_controller.index);
router.get("/log-out", user_controller.log_out);

// GET join secret-club form
router.get("/secret-club", user_controller.secret_form_get);

// POST join secret-club form
router.post("/secret-club", user_controller.secret_form_post);

// GET admin form
router.get("/admin-form", user_controller.admin_form_get);

// POST admin form
router.post("/admin-form", user_controller.admin_form_post);

// DELETE message
router.post("/delete", message_controller.index_message_delete_post);

module.exports = router;
