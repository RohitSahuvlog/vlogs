const {Schema,model}=require("mongoose")

const BlogSchema =new Schema({
Title:String,

Category :String,
Author:String,
Content : String,
userId:String,
email:String
})
const BlogsModule = model("blogs",BlogSchema)
module.exports= BlogsModule