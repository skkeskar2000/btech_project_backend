const { response } = require("express");
const express = require("express");
const router = express.Router();
const form = require("../model/formModel");

router.post("/saveform", async (req, res) => {

    try {

        const { jobKnowledge, problemSolvingAbility, productivity, communicationSkill, leadership, creativity, achievements, projects, userId, userName,role, isVerified, } = req.body;

        // if (!jobKnowledge || !problemSolvingAbility || !productivity || !communicationSkill || !leadership || !creativity || !achievements || !projects || !userId || !userName || !isVerified) {
        //     return res.status(400).json({ message: "Please fill all fields" });
        // }

        const newForm = new form({
            jobKnowledge,
            problemSolvingAbility,
            productivity,
            communicationSkill,
            leadership,
            creativity,
            achievements,
            projects,
            userId,
            userName,
            role,
            isVerified,
        });

        const savedForm = await newForm.save();
        res.status(200).json({ message: "Saved Form" });


    } catch (error) {

        console.log(error);
    }
});


router.get('/getform',async(req,res)=>{
    try {
        userId = req.query.userId;
        // role = req.query.role;

        if(!userId){
            return res.status(401).send({message : 'Please Send proper data'});
        }
        
        const getForm = await form.findOne({ userId: userId});
        if(getForm==null){
            return res.status(400).send({message : "Form Is not Filled "})
        }

        return res.status(200).send(getForm);
    } catch (error) {
        console.log(error);
    }
});

router.get('/getallform',async(req,res)=>{
    try {
        role = req.query.role;

        if(!role){
            return res.status(401).send({message : 'Please Send proper data'});
        }
        
        const getAllForm = await form.find({ role: role});
        if(getAllForm==null){
            console.log(getAllForm);
            return res.status(400).send({message : "Form Is not Filled "})
        }

        return res.status(200).send(getAllForm);
    } catch (error) {
        console.log(error);
    }
});

router.post('/updateform',async(req,res)=>{
    
    try{

        formId = req.body.formId;
        isVerified = req.body.isVerified;

    console.log(formId);
    if(!formId){
        return res.status(400).send({message : 'Please Send proper data'});
    }
    
    const getForm = await form.findOne({ _Id: formId});

    if(getForm==null){
        return res.status(400).send({message : "Form does no exist"})
    }

    const updateForm = await form.updateOne(
        {
            '_id':formId,
        },
        {
            $set : 
            {
                'isVerified' : isVerified,
            }
        }
    );

    console.log(updateForm);
    
    return res.status(200).json({message : "updated sucessfully"});

    }catch(error){
        console.log(error)
    }

});


module.exports = router;