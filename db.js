const mongoose = require("mongoose");
require("dotenv").config();
const options = {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  //project_3_v01 يتم انشاء قاعدة بيانات اسمها 
  //encryption link db using dotenv
mongoose.connect(process.env.DATABASE, options).then(
    ()=>{console.log("Db connected");},
    (err)=>{console.log(err);})