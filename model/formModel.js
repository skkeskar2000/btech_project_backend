const mongoose = require("mongoose")

const formSchema = new mongoose.Schema({
    jobKnowledge: { type: Number, required: true, },
    problemSolvingAbility: { type: Number, required: true },
    productivity: { type: Number, required: true },
    communicationSkill: { type: Number, required: true },
    leadership: { type: Number, required: true },
    creativity: { type: Number, required: true },
    achievements: { type: Number, required: true },
    projects: { type: Number, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true},
    role: {type : String, required: true},
    isVerified: { type: Boolean, required: true },
},{timestamps:true});

const form =  mongoose.model("form",formSchema);

module.exports = form;