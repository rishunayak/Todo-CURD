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
app.get("/edit/:id",async(req,res)=>
{
     const id=req.params.id
     try
     {
        const data=await Todo.findOne({_id:id})
        res.send(data)
     }
     catch(e)
     {
        res.send(e)
     }            
   
})

app.patch("/edit/:id",async(req,res)=>
{
     const id=req.params.id
     try
     {
        const data=await Todo.findOneAndUpdate({_id:id},req.body)
        res.send({msg:"Todo Updated Successfully"})
     }
     catch(e)
     {
        res.send(e)
     }            
   
})

app.post("/addTodo",async(req,res)=>
{

    try
    {
        await Todo.create(req.body)
        res.send({msg:"New Task is Added"})
    }
    catch(e)
    {
        res.send(e)
    } 

})


app.patch("/update/:id",async(req,res)=>
{
    const id=req.params.id

    try
    {
         await Todo.findOneAndUpdate({_id:id},req.body)
         res.send({msg:"Task Updated Successfull"})
    }
    catch(e)
    {
        res.send(e)
    } 

})


app.delete("/update/:id",async(req,res)=>
{
    const id=req.params.id
    try
    {
        await Todo.findOneAndDelete({_id:id})
        res.send({msg:"Task Deleted Successfull"})
    }
    catch(e)
    {
        res.send(e)
    } 

})

module.exports=app