const express=require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Todo = require("../Models/todo.model");
const auth = require("../Middleware/authorization");


const app=express.Router()

app.use(auth)

app.get("/",async(req,res)=>
{
     
     try
     {
        const data=await Todo.find({id:req.body.id})
        res.send(data)
     }
     catch(e)
     {
        res.send(e)
     }            
   
})


app.patch("/:id",async(req,res)=>
{
     const id=req.params.id
     try
     {
        const data=await Todo.findOneAndUpdate({_id:id},req.body)
        res.status(200).send({msg:"Todo Updated Successfully",status:1})
     }
     catch(e)
     {
        res.send(e)
     }            
   
})

app.post("/",async(req,res)=>
{

    try
    {
        const newTodo=new Todo(req.body)
        await newTodo.save().then((todo)=>
        {
            return res.send({msg:"added Successfully",todo,status:1})
        })

    }
    catch(e)
    {
        res.send(e)
    } 

})




app.delete("/:id",async(req,res)=>
{
    const id=req.params.id
    try
    {
        await Todo.findOneAndDelete({_id:id})
        res.send({msg:"Task Deleted Successfull",status:1})
    }
    catch(e)
    {
        res.send(e)
    } 

})

module.exports=app