const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Create User - Post : /api/auth/createuser - No Login Required
router.post('/createuser',
    body('name','Enter a valid Name').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail(),
    body('password').isLength({ min: 5 }),
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

            var authtoken = jwt.sign(data,'shhhhh');
            res.json({authToken: authtoken});
        }
        catch(error){
            console.error(error.message);
            res.status(500).send("Something Went Wrong!!");
        }
    })

module.exports = router;