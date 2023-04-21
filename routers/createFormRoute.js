const { response } = require("express");
const express = require("express");
const router = express.Router();
const createForm = require("../model/createFormModel");

router.post('/createform', async (req, res) => {
    try {
        var data = req.body;
        console.log(req.body);
        // const form = await createForm.find();
        // console.log(form.length);

        // if (form.length > 0)
        //     return res.status(200).json({ 'msg': "Allready created form" });

        const newCreateForm = new createForm(data);

        const createdForm = newCreateForm.save();
        return res.status(200).json({ "status": true, "msg": "success" });
    } catch (error) {
        console.log(error);
    }
});

router.get('/getcustomform', async (req, res) => {
    try {
        const form = await createForm.find({});
        res.status(200).send(form);
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;
