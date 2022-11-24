const mongoose = require("mongoose")

const createFormSchema = new mongoose.Schema({},{strict: false});

const createform = mongoose.model('createform',createFormSchema);

module.exports = createform;