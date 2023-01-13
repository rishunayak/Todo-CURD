
require("dotenv").config()
const express=require("express")
const connect = require("./Config/config")
const userRoute=require("./Routes/user.route")
const todoRoute=require("./Routes/todo.route")

const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())
app.use("/users",userRoute)
app.use("/todos",todoRoute)


app.get("/",(req,res)=>
{
    res.send("Welcome to Todo Server");
})



app.listen(process.env.PORT,async()=> 
{
    await connect
    console.log("Server Started")
})