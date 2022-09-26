const express = require("express");
const { Router } = require("express");
const User = require("../modules/User");
const bcryptjs = require("bcryptjs");
const authRoute = Router();
var jwt = require('jsonwebtoken');

authRoute.post("/signup", async (req, res, next) => {
   try {
      const FrontendUserData = req.body;
      console.log(FrontendUserData)
      const { password } = FrontendUserData;

      bcryptjs.genSalt(10, (err, salt) => {
         if (err) {
            return res
               .status(500)
               .json({ status: "error", message: "Invalid Credendtials" });
         }
         bcryptjs.hash(password, salt, async function (err, hash) {
            if (err) {
               return res
                  .status(500)
                  .json({ status: "error", message: "invalid credentials" });
            } else {
               try {
                  await new User({
                     ...FrontendUserData,
                     password: hash,
                  }).save();
                  return res
                     .status(201)
                     .json({ status: "success", message: "signup sucessfull" });
               } catch (err) {
                  return res
                     .status(500)
                     .json({ status: "error", message: "bad request" });
               }
            }
         });
      });
   } catch (error) {
      res.send(error);
   }



})





authRoute.post("/login", async (req, res) => {
   const { email, password } = req.body





   let user = await User.find({ email })
   console.log(user)
   user = user[0]
 
   const hash = user.password;


   bcryptjs.compare(password, hash, async function (err, result) {
      if (err) {
         return res
            .status(500)
            .send({ status: "error", message: "invalid credentials hello" });
      }
      
         if (result) {
            var token = jwt.sign({ email: user.email, age: user.age, userId: user._id }, 'secret');
            console.log(token)
            return res.status(201).send({
               status: "success",
               email,
               message: "login sucessful",
               token,
               userId:user._id
            });
         }
      })
   
})

   module.exports = authRoute