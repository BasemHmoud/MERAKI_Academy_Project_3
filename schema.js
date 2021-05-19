const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
//On the users schema add a mongoose pre middleware on save event (ES5 function) that will:
usersSchema.pre("save",async function(){
  // lowercase the email
  this.email=this.email.toLowerCase();
  const salt=10;
  // hash the password
  this.password= await bcrypt.hash(this.password,salt)
})
const articlesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: "Users" },
  comments:[{type: mongoose.Schema.ObjectId, ref: "Users"}]
});

const commentsSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  commenter:{type: mongoose.Schema.ObjectId, ref: "Users"},
});
module.exports.Users = mongoose.model("Users", usersSchema);
module.exports.Articles = mongoose.model("Articles", articlesSchema);
module.exports.Comments = mongoose.model("Comments", articlesSchema);
