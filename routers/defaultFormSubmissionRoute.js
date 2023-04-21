const { response, json } = require("express");
const express = require("express");
const { trusted } = require("mongoose");
const router = express.Router();
const form = require("../model/defaultFormSubmission");
const { route } = require("./userRoute");

router.post("/submitDefaultform", async (req, res) => {
    console.log('request');
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

router.get('/', (req, res) => {
    console.log('working sa ve');
});


module.exports = router;