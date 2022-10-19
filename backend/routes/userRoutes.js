const express = require ('express');
const router = express.Router();
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
require('../db/db');


router.get("/",(req,res)=>{
    res.send("hola");
})

//Registering User
router.post("/register", async (req, res) =>{
    // res.json({message: req.body});

    const { name, email , phone , password } = req.body;

    if(!name || !email || !phone || !password ){
        return res.status(422).json({error:"Please fill all the fields properly"});
    }

    try{
        const userExist = await User.findOne({email: email});

        if(userExist){
            return res.status(422).json({error:"Email already exists"});
        }

        const user = new User ({ name , email , phone , password });

        await user.save();
        
        res.status(201).json({message: "User registered successfully"});
    }
    catch(err){
        console.log(err);
    }
  
});

//login user
router.post('/signin', async (req, res)=>{
    // console.log(req.body);
    try{
        const{ email , password } = req.body;

        if(!email || !password ){
            return res.status(400).json({error:"Please Fill all the Fields"})
        }

        const userLogin = await User.findOne({email: email})

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{
                //2592000000 miliseconds = 30days
                expires: new Date(Date.now()+2592000000),
                httpOnly: true
            });


        if(!isMatch){
            res.status(400).json({error:"Invalid Credentials"});
        }
        else{
        res.json({message : "Login successful"})
        }
        }
        

    }catch(err){
        console.log(error);
    }
})

module.exports = router;