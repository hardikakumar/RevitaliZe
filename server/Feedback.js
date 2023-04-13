const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
    member_id: {
        type: String,
        length: 100
    },
    feedbackMsg: {
        type: String,
    },
})

module.exports = mongoose.model("feedbacks", FeedbackSchema)