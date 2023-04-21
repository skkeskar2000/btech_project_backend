const mongoose = require("mongoose")

const defaulttFormSubmissionSchema = new mongoose.Schema({
}, { strict: false }, { timestamps: true });

const defaultFormSubmission = mongoose.model("defaultFormSubmission", defaulttFormSubmissionSchema);

module.exports = defaultFormSubmission;