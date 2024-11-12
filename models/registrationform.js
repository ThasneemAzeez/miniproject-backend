const { default: mongoose } = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: String,
  eventname: String,
  college: String,
  department: String,
  phnno: String,
  email: String
});


const Registration = mongoose.model("Registration", registrationSchema);
module.exports=Registration