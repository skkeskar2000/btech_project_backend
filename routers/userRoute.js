const express = require("express");
const router = express.Router();
const user = require("../model/userModel");

router.post("/register",async(req,res)=>{
    try {
        
        const {email, password, name, role} = req.body;

        if(!email || !password || !name || !role){
            return res.status(400).json({errorMessage : "Plese enter all required field"});
        }

        if(password.length < 5){
            return res.status(400).json({errorMessage: "Plese enter password more the 6 character"});
        }

        // if(role != "employee" || role != "ceo" || role != "manager"){
        //     return res.status(400).json({message: "check you role"});
        // }
        const existingUser = await user.findOne({email: email});

        if(existingUser){
            return res.status(400).json({message : "With this user all ready exist"});
        }

        const newUser = new user({
            email,
            password,
            name,
            role
        })

        const saveUser = await newUser.save();
        return res.status(200).json({message: "Saved user"});


    } catch (error) {
        console.log("error");
    }
});


router.get("/login",async(req,res)=>{
    try{
        
        email = req.query.email;
        password = req.query.password;

        if(!email || !password){
            return res.status(400).json({messsage : "Please Enter all fileds"});
        }

        const findUser = await user.findOne({email : email});
        // console.log(findUser);
        if(!findUser){
            return res.status(400).json({msg : "Wrong password or email"});
        }

        if(findUser.password !== password){
            return res.status(400).json({msg : "Wrong password or email"});
        }

        if(findUser.password === password){
            return res.status(200).json(findUser);
        }

    }catch(error){
        console.log(error);
    }
});


router.get("/selecteduser",async(req,res)=>{
    try {
        var role = req.query.role;

        if(!role){
            return res.status(200).json({status:false,msg : "Please Enter all fileds"});
        }

        const findUsers = await user.find({role : role});

        if(!findUsers){
            return res.status(200).json({status:false,msg: "There is no user"});
        }

        return res.status(200).send({status: true,data:findUsers})
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;