const express = require("express")
const {connection} = require("./config")
const app =express()
require('dotenv').config()
const authRouter =require("./Routes/Auth") 
const userRouter =require("./Routes/Blogsuser") 
const cors = require("cors")
const authentication = require("./Middleware/Authication")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use("/auth",authRouter)
app.use(authentication)
app.use("/blogs",userRouter)

const PORT = process.env.PORT || 8080;
app.get("/",(req,res)=>{
    res.send("heroku deployments")
})

app.listen(PORT,async()=>{
    try{
        await connection
        console.log(" connection to db")
    }catch{
console.log("error in connect to db")
    }
  
    console.log(`server will ${PORT} port` )
})