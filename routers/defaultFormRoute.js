const { response } = require("express");
const express = require("express");
const defaultFormModel = require("../model/defalultFormModel");
const router = express.Router();


router.get('/getdefaultform', async (req, res) => {
    try {
        console.log('called get');
        const form = await defaultFormModel.find({});
        res.status(200).send(form);
    } catch (error) {
        res.status(404);
        console.log(error);
    }
});

router.put('/publishStatus', async (req, res) => {
    console.log('put req');
    try {
        console.log(req.query)
        formId = req.query._id;
        console.log(formId);
        isPublished = req.query.isPublished;
        if (isPublished == "true") {
            updateVal = Boolean(true);
        }
        else {
            updateVal = Boolean(false);
        }
        console.log(isPublished);
        if (!formId) {
            return res.status(200).send({ status: false, msg: 'Please Send proper data' });
        }
        const getForm = await defaultFormModel.findById(formId);
        console.log(getForm)
        if (getForm == null) {
            return res.status(200).send({ status: false, msg: "Form does no exist" })
        }


        const updateForm = await defaultFormModel.updateOne(
            {
                '_id': formId,
            },
            {
                $set:
                {
                    'isPublished': updateVal,
                }
            }
        );
        return res.status(200).json({ status: true, msg: "updated sucessfully" });
    } catch (error) {
        return res.status(404).json({ status: false, msg: "Bad Request" })
    }
})
module.exports = router;