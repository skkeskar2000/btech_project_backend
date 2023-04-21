const mongoose = require("mongoose")

const defaultFormSchema = new mongoose.Schema({
}, { strict: false });

const defaultFormModel = mongoose.model("Defaultform", defaultFormSchema);

module.exports = defaultFormModel;

//66