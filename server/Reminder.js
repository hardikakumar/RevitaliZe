const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReminderSchema = new Schema({
    reminderMsg: {
        type: String
    },
    remindAt: {
        type: String
    },
    reminderFreq: {
        type: Number
    },
    member_id: {
        type: String
    }
}
)

module.exports = mongoose.model("reminders", ReminderSchema)