var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
});

//Export model
module.exports = mongoose.model("User", UserSchema);
