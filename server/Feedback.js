const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
    member_id: {
        type: String,
        length: 100
    },
    member_name: {
        type: String,
    },
    feedbackMsg: {
        type: String,
    },
})

module.exports = mongoose.model("feedbacks", FeedbackSchema)