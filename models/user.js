var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership: {
    type: String,
    required: true,
    enum: ["Member", "Admin"],
    default: "Member",
  },
});

//Export model
module.exports = mongoose.model("User", UserSchema);
