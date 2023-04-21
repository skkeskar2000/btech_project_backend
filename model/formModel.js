const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
}, { strict: false }, { timestamps: true });

const form = mongoose.model("form", formSchema);

module.exports = form;


