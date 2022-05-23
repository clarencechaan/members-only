var Message = require("../models/message");

// Display index with messages
exports.index = function (req, res) {
  res.render("index");
};

// Create Message GET
exports.create_message_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Create message GET");
};

// Create Message
exports.create_message_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Create message POST");
};
