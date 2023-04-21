const { response } = require("express");
const express = require("express");
const router = express.Router();
const dailyChekin = require("../model/dailyChekinModel");


router.get('/test', async (req, res) => {
    console.log('workin chekin');
})

router.get('/dailyChekinEmployee', async (req, res) => {
    try {
        var empId = req.query.empId;
        console.log(empId);
        var data = await dailyChekin.find({ "empId": empId })
        console.log(data);
        return res.status(200).send(data);

    } catch (error) {
        return res.status(404).send(error);
    }
})

router.get('/allChekins', async (req, res) => {
    try {
        var data = await dailyChekin.find({})
        if (!data) {
            return res.status(404);
        }
        return res.status(200).send(data);
    } catch (error) {
        return res.status(404).send(error);

    }
})
router.get('/getAllTodayChekins', async (req, res) => {
    var todayDate = req.query.date;
    console.log(todayDate);
    var allTodayChekins = await dailyChekin.find({ "date": todayDate });
    console.log(allTodayChekins);
    return res.status(200).send(allTodayChekins);
})

router.get('/chekIfTodayMarked', async (req, res) => {
    try {
        var empId = req.query.empId;
        var todayDate = req.query.date;
        console.log(empId);
        console.log(todayDate);
        var data = await dailyChekin.find({ "empId": empId, "date": todayDate });
        console.log(data);
        if (data.length == 0) {
            return res.status(200).send({ 'status': false, msg: "You can add attendance" });
        }
        else {
            return res.status(200).send({ 'status': true, msg: "already marked" });
        }
    } catch (error) {
        return res.status(404).send('bad request');

    }

})

router.post('/markChekin', async (req, res) => {
    try {

        var chekinData = req.body;
        console.log(chekinData);
        const newData = dailyChekin(chekinData);
        await newData.save();
        console.log('after save');
        return res.status(200).send('done');
    } catch (error) {
        console.log(error);
        return res.status(404);

    }
})


module.exports = router;