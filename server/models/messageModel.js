const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  input: { type: String, required: true},
  output: { type: String, required: true},
});

module.exports =Chatgpt= mongoose.model("ChatGPT", messageSchema);
