var Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const user = require("../models/user");

// Display index with messages
exports.index = function (req, res, next) {
  Message.find({})
    .populate("user")
    .sort({ date: -1 })
    .exec(function (err, messages) {
      if (err) {
        return next(err);
      }
      res.render("index", { user: req.user, messages: messages });
    });
};

// Create Message GET
exports.create_message_get = function (req, res) {
  res.render("new-message", { user: req.user });
};

// Create Message POST
exports.create_message_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1, max: 120 })
    .escape(),
  body("text", "Message text must not be empty.")
    .trim()
    .isLength({ min: 1, max: 1500 })
    .escape(),
  function (req, res, next) {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again
      res.render("new-message", {
        title: "New Message",
        errors: errors.array(),
        user: req.user,
      });
      return;
    }
    next();
  },
  // Process request after validation and sanitization.
  function (req, res, next) {
    // Data from form is valid.
    // Create a Message object with escaped and trimmed data.
    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      user: req.user._id,
      date: new Date(),
    });

    // Save message.
    message.save(function (err) {
      if (err) {
        return next(err);
      }
      //successful - redirect to index
      res.redirect("/");
    });
  },
];

// handle index message delete POST
exports.index_message_delete_post = function (req, res) {
  Message.findByIdAndRemove(req.body.message_id, (err) => {
    if (err) {
      return next(err);
    }
    //successful
    res.redirect("/");
  });
};
