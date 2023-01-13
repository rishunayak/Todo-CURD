const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    fname:{type:String,required:true},
    age:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const User=mongoose.model("users",userSchema);
module.exports=User