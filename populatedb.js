#! /usr/bin/env node

console.log(
  "This script populates some test games, genres, consoles, and accessories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/video_game_inventory?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
const bcrypt = require("bcryptjs");
var User = require("./models/user");
var Message = require("./models/message");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var users = [];
var messages = [];

function userCreate(first_name, last_name, username, password, cb) {
  var user = new User({
    first_name,
    last_name,
    username,
  });

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    user.password = hashedPassword;
    user.save(function (err) {
      if (err) {
        return cb(err, null);
      }
      console.log("New User: " + user);
      users.push(user);
      cb(null, user);
    });
  });
}

function messageCreate(title, text, user, date, member, cb) {
  var message = new Message({
    title,
    text,
    user,
    date,
    member,
  });

  message.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Message: " + message);
    messages.push(message);
    cb(null, message);
  });
}

function createUsers(cb) {
  async.series(
    [
      function (callback) {
        userCreate("Leonard", "Day", "theapartment", "pass", callback);
      },
      function (callback) {
        userCreate("Alex", "Morris", "chocolatebar", "pass", callback);
      },
      function (callback) {
        userCreate("Felecia", "Fisher", "puppisa", "pass", callback);
      },
      function (callback) {
        userCreate("Fred", "Torres", "parrot", "pass", callback);
      },
      function (callback) {
        userCreate("Arnold", "Jordan", "bridge", "pass", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createMessages(cb) {
  async.series(
    [
      function (callback) {
        messageCreate(
          "Lecture Rescheduling",
          "Hi mates, so I talked to Dr. Helen and because of her illness we need to reschedule the upcoming lecture. You probably notice that this lecture is the last before the exam so Dr. Helen has asked us if we want to attend an additional lecture where we can study more difficult exercises.",
          users[0],
          new Date(),
          false,
          callback
        );
      },
      function (callback) {
        messageCreate(
          "Picture held literature though engaged met discovery allow",
          "Amongst increasing rooms. Procuring things written concluded painful think secure sensible seems share had arrival remark. Differed savings mind aware. Advice announcing show about. Allow agreeable be denoting distrusts domestic departure secure john chamber thought our feet arose improve throwing west.",
          users[1],
          new Date() - 5 * 60 * 1000,
          false,
          callback
        );
      },
      function (callback) {
        messageCreate(
          "Offence round surprise",
          "Can followed village window replying confined explain think felicity oppose lovers enquire zealously favourite middletons steepest abroad. Marianne respect ashamed middleton felicity called. But only wrong three. Not easy along money departure learn manor possession about jointure read judgment out points. Because elsewhere adieus voice saved put ﻿no collected. ",
          users[2],
          new Date() - 60 * 60 * 1000,
          false,
          callback
        );
      },
      function (callback) {
        messageCreate(
          "Death situation why natural written again",
          "Witty men procuring excited gave proposal continual county neglected raptures allow vanity terminated merit exposed very household. Bringing companions delightful effects the delightful often had drawn and. Contented open decay dwelling determine known of be expect has own. Several mile suspicion mind covered rejoiced most mind. Sure maids regard nature.",
          users[3],
          new Date() - 7 * 60 * 60 * 1000,
          false,
          callback
        );
      },
      function (callback) {
        messageCreate(
          "Means sufficient chapter room answer expense",
          "Attempted keeps fulfilled known lose. Mistress know unfeeling continued respect enabled several daughter worth laughing over entire season. Fortune principle in supported improve witty nor belonging securing surrounded true. Manner rejoiced frankness shew dearest unsatiable sang repair round any. Cottage too assure behaved resolve delicate extensive become.",
          users[4],
          new Date() - 24 * 60 * 60 * 1000,
          false,
          callback
        );
      },
      function (callback) {
        messageCreate(
          "Prevailed through agreed",
          "Joy greater lose round windows wooded future almost reserved arise soon your property unlocked thoughts entirely forming. Merit placing child post affixed likewise future county fail park them. Household described insipidity friend excellence particular between. Too praise finished but. Effects view believe them raptures style turned off meet solid piqued fully fat.",
          users[0],
          new Date() - 3 * 24 * 60 * 60 * 1000,
          false,
          callback
        );
      },
      function (callback) {
        messageCreate(
          "Easily arrival face depart excellent concerns given discourse",
          "Often talked merry advantage introduced discovery you avoid esteems sportsman greatest justice kindness dissimilar scale. Pleasant september to sex increasing sigh long. Covered unlocked window smile jennings kept tears announcing cousin necessary fine innate. Seen removing well secure travelling. Recommend either parties finished breeding delicate frequently fully hoped among linen quitting rooms.",
          users[1],
          new Date() - 2 * 7 * 24 * 60 * 60 * 1000,
          false,
          callback
        );
      },
      function (callback) {
        messageCreate(
          "Many depart think sure greater dining vexed",
          "Forfeited doubt jokes had incommode ourselves his does throwing piqued mother. Unsatiable pure prevailed down hills right esteems very. Matter literature busy dashwoods abilities yet small soon near delight zealously exquisite desire. What opinions is being met placing insipidity affronting oppose strictly between rank convinced extremely daughter moments day. Then instantly unpacked preserved say civility seeing friend effect sorry say.",
          users[2],
          new Date() - 3 * 7 * 24 * 60 * 60 * 1000,
          false,
          callback
        );
      },
      function (callback) {
        messageCreate(
          "Above announcing unwilling charm finished removal education",
          "Jokes continual allowance calling abilities blush size allow necessary worse sudden gone propriety come viewing shy explained. Consulted settling park song cheerful wishes none. Late viewing parish sincerity added doubt. Particular boisterous rank power demands chicken farther raptures sussex. Esteem expense stairs winding.",
          users[3],
          new Date() - 4 * 7 * 24 * 60 * 60 * 1000,
          false,
          callback
        );
      },
      function (callback) {
        messageCreate(
          "County brother pretty inquietude",
          "Son necessary dare meant hearted carried procured insensible. Attempted raising down except manners change recommend hand. Met peculiar returned purse lived honoured outward shy listening surrounded rather. Interested direction screened world given acceptance another discretion unpleasant built reached removing examine. Smart either expect what wandered.",
          users[4],
          new Date() - 6 * 7 * 24 * 60 * 60 * 1000,
          false,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createUsers, createMessages],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
