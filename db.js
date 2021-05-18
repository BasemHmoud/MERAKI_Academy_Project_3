const mongoose = require("mongoose");
const options = {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  //project_3_v01 يتم انشاء قاعدة بيانات اسمها 
mongoose.connect("mongodb://localhost:27017/project_3_v01", options).then(
    ()=>{console.log("Db connected");},
    (err)=>{console.log(err);})