const express=require("express")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../Models/user.model");

const app=express.Router()


app.post("/register",async(req,res)=>
{
    const {fname,email,password,age}=req.body;
    
    try
    {
        const exist=await User.findOne({email:email})
    
         if(exist)
         {
            res.send("User already Exist"); 
         }
         else
         {
            bcrypt.hash(password, 5, async(err, hashPassword)=> {

                if(err)
                {
                    console.log(err)
                }
                else
                {
                    try
                    {
                        await User.create({fname,email,age,password:hashPassword}) 
                        res.send({msg:"Registered Successfully"})
                    }
                    catch(e)
                    {
                        res.send(e)
                    }
                    
                }
                
            });
            
         }
    }
    catch(e)
    {
        res.send(e)
        console.log(e)
    }

})

app.post("/login",async(req,res)=>
{
    try
    {
        const exist=await User.findOne({email:req.body.email})

        if(exist)
        {
           bcrypt.compare(req.body.password,exist.password,(err,result)=>
           {
              if(result)
              {
                const token=jwt.sign({id:exist._id},"auth");
                res.send({token:token})
              }
              else
              {
                res.send("Wrong Credntials");
              }
          })
        }
        else
        {
           res.send("Email Don't exist")
        }
 
    }
    catch(e)
    {
        res.send(e)
    }
    
})





module.exports=app