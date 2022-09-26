
const express =require("express")
const {Router}= require("express")
const User = require("../modules/User")
const userRoute = Router()
const BlogsModule = require("../modules/Blogs")

var jwt = require('jsonwebtoken');
userRoute.get("/blogs",async(req,res)=>{
    // const id = req.params.todoId

        const user = await BlogsModule.find()
        // console.log(user)

      return  res.send(user)
   
  })

  userRoute.get("/",async(req,res)=>{
console.log(req.query)

if(req.query.category && req.query.author){

  let user = await BlogsModule.find({$and:[{"Author":`${req.query.author}`},{"Category":`${req.query.category}`}
]}
)


  return  res.send(user)
}else if(req.query.author){
  let user = await BlogsModule.find({"Author":`${req.query.author}`})
  return  res.send(user)
}
else if(req.query.category){
  let user = await BlogsModule.find({"Category":`${req.query.category}`})
  return  res.send(user)
}else{

  let user = await BlogsModule.find({$or:[{"Author":`${req.query.author}`},{"Category":`${req.query.category}`}
 
]})

 
return  res.send(user)
}

    

 
      
     

   
  })

  userRoute.post("/create",async(req,res)=>{



        const user = new BlogsModule(req.body

        )
        

    await user.save()
      res.send(user)
    
   
  })

  userRoute.patch("/:blogsId/edit",async(req,res)=>{
    const noteId= req.params.blogsId
// console.log(noteId)

  
    const new_todo = await BlogsModule.findOneAndUpdate({
        userId:noteId},req.body)

       const user = await BlogsModule.find({
          userId:noteId})

          if(user){
            res.send(user)
          
       
  }else{
    res.send("not upadded")
  } 

       
      })
      userRoute.delete("/:blogsId/edit",async(req,res)=>{
        const noteId=req.params.todoId;
      
     
        
                let users = await BlogsModule.deleteOne({
    userId:noteId})
    const user = await BlogsModule.find({
      userId:noteId})
     
      if(user.length==0){
res.send("successfully delete")
      }else{
        res.send("not delete")
      } 
         
 
           
          })
        

  module.exports =userRoute
