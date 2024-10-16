const Mongooose = require("mongoose")
const userSchema = Mongooose.Schema(
    {
        "email":{type:String,required:true},
        "password":{type:String,requried:true}
    }
)

let loginModel = Mongooose.model("admin",userSchema);
module.exports=loginModel
