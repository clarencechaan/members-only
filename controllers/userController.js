var User = require("../models/user");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

exports.log_in_get = function (req, res) {
  res.render("log-in");
};

exports.log_in_post = function (req, res) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user);
          } else {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" });
          }
        });
      });
    })
  );
  res.send("NOT IMPLEMENTED: Log in POST");
};

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
