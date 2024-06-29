const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET="ayushisagoodboy";

//ROUTE 1 : to create a user 
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are errors, reutrns bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check whether the same email already exists or not
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "email is already there" });
      }
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //if not present in the database ,creates a new

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data={
        user:{
          id : user.id
        }
      }
      const  authtoken = jwt.sign(data,JWT_SECRET );

      res.json({authtoken:authtoken});
    } catch (error) {
      //catches error internal code errors
      console.error(error.message);
      res.status(500).json("some error occurred");
    }
  }

)
//Route 2 : to login using api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").exists(),
  ],async (req, res) => {
    //if there are errors, reutrns bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password}=await req.body;
    try{
      let user =await User.findOne({email});
      if (!user) {
        return res.status(400).json({ error: "try with correct credetial" });
      }
      const passwordCompare = await bcrypt.compare(password,user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "try with correct credetial" });
      }
      const data={
        user:{
          id : user.id
        }
      }
      const  authtoken = jwt.sign(data,JWT_SECRET );
      res.json({authtoken:authtoken});

    }catch (error) {
      //catches error internal code errors
      console.error(error.message);
      res.status(500).json("Internal server error");
    }
  })
 //Route 3 : to get user details using api/auth/getuser
 router.post(
  "/getuser",fetchuser, async (req, res) => {
  
    try{
     const userId  = req.user.id;
       const user = await User.findById(userId).select("-password")
      res.send(user);
    }catch (error) {
      //catches error internal code errors
      console.error(error.message);
      res.status(500).json("Internal server error");
    }
  })
module.exports = router;
