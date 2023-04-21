const { response, json } = require("express");
const express = require("express");
const { trusted } = require("mongoose");
const router = express.Router();
const form = require("../model/formModel");
const { route } = require("./userRoute");

router.post("/submitform", async (req, res) => {
    console.log('called submit form');
    try {
        const formData = req.body;
        console.log(req.body);
        const newForm = new form(formData);
        await newForm.save();
        res.status(200).json({ status: true, msg: "Saved Form" });
    } catch (error) {
        console.log('heere');
        console.log(error);
    }
});


router.get('/getform', async (req, res) => {
    try {
        userId = req.query.userId;
        let isDisplay = req.query.isDisplay;

        if (!userId) {
            return res.status(200).send({ 'status': false, msg: 'Please Send proper data' });
        }

        const getForm = await form.find({ userId: userId });

        if (isDisplay === "true") return res.status(200).send({ 'status': true, "data": getForm });

        console.log(getForm);
        if (getForm.length == 0 || getForm == null) {
            return res.status(200).send({ 'status': true, msg: "Form Is not Filled " })
        }

        var year = new Date(getForm[getForm.length - 1].createdAt);
        var finalYear = year.getFullYear();
        var mainYear = new Date();
        mainYear = mainYear.getFullYear();


        if (finalYear == mainYear) return res.status(200).send({ 'status': false, msg: "Form is Filled" });

        else return res.status(200).send({ 'status': true, msg: "You can fill form now" });

    } catch (error) {
        console.log(error);
    }
});

router.get('/getCustomFormResponseByUserId', async (req, res) => {
    try {
        var userId = req.query.userID;
        console.log(userId);
        const formResponse = await form.find({ "userId": userId, "isVerified": true });
        console.log(formResponse);
        return res.status(200).send(formResponse);
    } catch (error) {
        return res.status(404);

    }
})

router.get('/getCustomFormResponses', async (req, res) => {
    try {
        const getCustomFormResponses = await form.find({})
        return res.status(200).send(getCustomFormResponses);
    } catch (error) {
        return res.status(404);

    }
})

router.get('/getallformSubmission', async (req, res) => {
    try {
        role = req.query.role;

        if (!role) {
            return res.status(200).send({ 'status': false, msg: 'Please Send proper data' });
        }

        const getAllForm = await form.find({ role: role });
        if (getAllForm == null) {
            return res.status(200).send({ 'status': false, msg: "Form Is not Filled " })
        }
        return res.status(200).send({ 'status': true, "data": getAllForm });
    } catch (error) {
        console.log(error);
    }
});

router.put('/varifyform', async (req, res) => {
    try {
        formId = req.query.formId;
        isVerified = req.query.isVerified;
        userId = req.query.userId;
        if (isVerified == "true") {
            updateVal = Boolean(true);
        }
        else {
            updateVal = Boolean(false);
        }
        console.log(userId);
        console.log(formId);
        if (!formId) {
            return res.status(200).send({ status: false, msg: 'Please Send proper data' });
        }

        const getForm = await form.find({ userId: userId, formId: formId });

        console.log(getForm);
        if (getForm == null) {
            return res.status(200).send({ status: false, msg: "Form does no exist" })
        }

        const updateForm = await form.updateOne(
            {
                'formId': formId,
                'userId': userId
            },
            {
                $set:
                {
                    'isVerified': updateVal,
                }
            }
        );

        // console.log(updateForm);

        return res.status(200).json({ status: true, msg: "updated sucessfully" });

    } catch (error) {
        console.log(error)
    }

});

router.delete('/deleteForm', async (req, res) => {
    try {
        formId = req.query.formId;
        if (!formId) {
            return status(200).json({ status: false, msg: "send proper data" });
        }
        await form.deleteOne({ '_id': formId });
        return res.status(200).send({ status: true, msg: 'Form Delted Success' });
    } catch (error) {
        console.log(error)
        res.status(200).json({ status: false, msg: "Server Error" });
    }
});

router.get('/checkalreadyfilled', async (req, res) => {
    userId = req.query.userId;
    formId = req.query.formId;
    console.log(userId);
    console.log(formId);
    try {
        if (!userId && !formId) {
            return res.status(200).json({ status: false, msg: "send proper data" });
        }
        const foundResponse = await form.find({ userId: userId, formId: formId })
        console.log(foundResponse);

        if (foundResponse.length == 0) {
            console.log('form not filled');
            return res.status(200).json({ status: true, msg: 'NotFilled' });
        }
        else if (foundResponse) {
            console.log('form filled');
            return res.status(200).json({ status: true, msg: 'FormFilled' });
        }
    } catch (error) {
        res.status(404).json({ status: false, msg: "Server Error" });
    }

})

module.exports = router;