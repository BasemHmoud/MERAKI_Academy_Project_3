const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const articlesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: mongoose.Schema.ObjectId,ref:"articles" },
});

module.exports = mongoose.model("users", usersSchema);
module.exports = mongoose.model("articles", articlesSchema);
