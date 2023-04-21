const mongoose = require("mongoose")

const dailyChekinModel = new mongoose.Schema({}, { strict: false });

const dailyChekin = mongoose.model('dailychekin', dailyChekinModel);

module.exports = dailyChekin;