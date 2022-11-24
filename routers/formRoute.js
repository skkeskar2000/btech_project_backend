const { response } = require("express");
const express = require("express");
const router = express.Router();
const form = require("../model/formModel");

router.post("/saveform", async (req, res) => {
    try {
        const formData = req.body;
        const newForm = new form(formData);
        await newForm.save();
        res.status(200).json({status: true,msg: "Saved Form" });
    } catch (error) {
        console.log(error);
    }
});


router.get('/getform',async(req,res)=>{
    try {
        userId = req.query.userId;
        let isDisplay = req.query.isDisplay;

        if(!userId){
            return res.status(200).send({'status': false,msg : 'Please Send proper data'});
        }
        
        const getForm = await form.find({ userId: userId});
        
        if(isDisplay === "true")  return res.status(200).send({'status': true,"data":getForm});
        
        console.log(getForm);
        if(getForm.length==0 || getForm == null){
            return res.status(200).send({'status': true,msg : "Form Is not Filled "})
        }

        var year = new Date(getForm[getForm.length - 1].createdAt);
        var finalYear = year.getFullYear();
        var mainYear = new Date();
        mainYear = mainYear.getFullYear();
        

        if(finalYear == mainYear ) return res.status(200).send({'status': false,msg: "Form is Filled"});

        else return res.status(200).send({'status': true,msg:"You can fill form now"});

    } catch (error) {
        console.log(error);
    }
});

router.get('/getallform',async(req,res)=>{
    try {
        role = req.query.role;

        if(!role){
            return res.status(200).send({'status': false,msg : 'Please Send proper data'});
        }
        
        const getAllForm = await form.find({ role: role});
        if(getAllForm==null){
            return res.status(200).send({'status': false, msg : "Form Is not Filled "})
        }
        return res.status(200).send({'status': true,"data":getAllForm});
    } catch (error) {
        console.log(error);
    }
});

router.put('/updateform',async(req,res)=>{
    try{
        formId = req.query.formId;
        isVerified = req.query.isVerified;

        console.log(formId);
        if(!formId){
            return res.status(200).send({status:false,msg : 'Please Send proper data'});
        }
        
        const getForm = await form.findById(formId  );

        console.log(getForm);
        if(getForm==null){
            return res.status(200).send({status:false , msg : "Form does no exist"})
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

    // console.log(updateForm);
    
    return res.status(200).json({status : true , msg : "updated sucessfully"});

    }catch(error){      
        console.log(error)
    }

});


module.exports = router;