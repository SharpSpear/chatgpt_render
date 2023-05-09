const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  firstName: { type: String },  
  lastName: { type: String },
});

module.exports = User = mongoose.model("user", userSchema);
