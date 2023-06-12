const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  name: String,
  salary: Number,
  vehicle: String,
});
let Model = mongoose.model("Driver", modelSchema);
module.exports = Model;
