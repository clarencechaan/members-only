var express = require("express");
var router = express.Router();

// Require controller module
var user_controller = require("../controllers/userController");

/* GET log-in page. */
router.get("/", user_controller.log_in_get);

/* POST log-in page. */
router.post("/", user_controller.log_in_post);

module.exports = router;
