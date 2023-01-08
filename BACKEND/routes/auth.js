const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = 'shhhh';
//Create User - Post : /api/auth/createuser - No Login Required
router.post('/createuser',
    body('name','Enter a valid Name').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail(),
    body('password','Length of the password should be min 5 characters').isLength({ min: 5 }),
    async (req,res)=>{
        //If there are an errors, send bad request and error messages
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        try{
            let user = await User.findOne({email: req.body.email});

            if(user){
                return res.status(400).json({ error: "Email already Exist" });
            }
        
            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt);
        
            //Create a New User
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secpass,
            })
            
            const data = {
                user:{
                    id:user.id
                }
            }

            var authtoken = jwt.sign(data,JWT_TOKEN);
            res.json({authToken: authtoken});
        }
        catch(error){
            console.error(error.message);
            res.status(500).send("Something Went Wrong!!");
        }
    })


//Login - Post : /api/auth/login
    router.post('/login',
    body('email','Please enter valid email').isEmail(),
    body('password','Password should not be blank').exists(),
    async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        const {email, password} = req.body;       
        try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({ error: "Please enter valid credential" });
            }

            const comparepassward = await bcrypt.compare(password,user.password);
            if(!comparepassward){
                return res.status(400).json({ error: "Please enter valid credential" });
            }

            const data = {
                user:{
                    id:user.id
                }
            }

            var authtoken = jwt.sign(data,JWT_TOKEN);
            res.json({authToken: authtoken});

        }
        catch(error){
            console.error(error.message);
            res.status(500).send("Something Went Wrong!!");
        }
    })

module.exports = router;