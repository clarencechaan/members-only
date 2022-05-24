var User = require("../models/user");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { render } = require("../app");

exports.log_in_get = function (req, res) {
  res.render("log-in", {
    flash_messages: req.flash("error"),
  });
};

exports.log_in_post = [
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1, max: 40 })
    .escape(),
  body("password", "Password confirmation must not be empty.")
    .trim()
    .isLength({ min: 1, max: 40 })
    .escape(),
  function (req, res, next) {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are validation errors. Render form again
      res.render("log-in", {
        title: "Log in",
        errors: errors.array(),
      });
      return;
    }

    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureFlash: true,
  }),
];

exports.create_user_get = function (req, res) {
  res.render("sign-up");
};

// Create User POST
exports.create_user_post = [
  // Validate and sanitize fields.
  body("first_name", "First name must not be empty.")
    .trim()
    .isLength({ min: 1, max: 40 })
    .escape(),
  body("last_name", "Last name must not be empty.")
    .trim()
    .isLength({ min: 1, max: 40 })
    .escape(),
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1, max: 40 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1, max: 40 })
    .escape(),
  body("confirm", "Password confirmation must not be empty.")
    .trim()
    .isLength({ min: 1, max: 40 })
    .escape(),
  function (req, res, next) {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const errorsArr = errors.array();

    if (req.body.password !== req.body.confirm) {
      errorsArr.push({ msg: "Passwords must match." });
    }

    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) {
        return next(err);
      }

      if (user) {
        // Username taken. Push to errors array.
        errorsArr.push({ msg: "Username taken." });
      }

      if (errorsArr.length) {
        // There are errors. Render form again
        res.render("sign-up", {
          title: "Sign up",
          errors: errorsArr,
        });
        return;
      }
      next();
    });
  },
  // Process request after validation and sanitization.
  function (req, res, next) {
    // Data from form is valid.
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      // Create a User object with escaped and trimmed data.
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,
      });

      // Save user.
      user.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful - redirect to index
        res.redirect("/");
      });
    });
  },
];

// handle log out GET
exports.log_out = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};