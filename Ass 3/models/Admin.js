const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
});
let Model = mongoose.model("Admin", modelSchema);
module.exports = Model;
