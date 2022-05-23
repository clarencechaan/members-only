var express = require("express");
var router = express.Router();

// Require controller module
var user_controller = require("../controllers/userController");

/* GET sign-up page. */
router.get("/", user_controller.create_user_get);

/* POST sign-up page. */
router.post("/", user_controller.create_user_post);

module.exports = router;
