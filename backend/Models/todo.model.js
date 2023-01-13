const mongoose=require("mongoose");

const todoSchema=mongoose.Schema({
    title:{type:String,required:true},
    status:{type:Boolean,required:true},
    id:{type:String,required:true}
})

const Todo=mongoose.model("todos",todoSchema);
module.exports=Todo