var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
});

// Virtual for message's date measured in time ago
MessageSchema.virtual("time_ago").get(function () {
  const now = Math.round(new Date().getTime() / 1000);
  const start = Math.round(this.date / 1000);
  const seconds = now - start;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  let resultStr = "";

  if (weeks > 4) {
    resultStr = new Date(start * 1000).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } else if (weeks > 1) {
    resultStr = weeks + " weeks ago";
  } else if (weeks === 1) {
    resultStr = weeks + " week ago";
  } else if (days > 1) {
    resultStr = days + " days ago";
  } else if (days === 1) {
    resultStr = days + " day ago";
  } else if (hours > 1) {
    resultStr = hours + " hours ago";
  } else if (hours === 1) {
    resultStr = hours + " hour ago";
  } else if (minutes > 1) {
    resultStr = minutes + " minutes ago";
  } else if (minutes === 1) {
    resultStr = minutes + " minute ago";
  } else {
    resultStr = "just now";
  }

  return resultStr;
});

//Export model
module.exports = mongoose.model("Message", MessageSchema);
