const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReminderSchema = new Schema({
    member_id: {
       type: String
    },
    reminderMsg: {
        type: String
    },
    remindAt: {
        type: String
    },
    reminderFreq: {
        type: Number
    }
}
)

module.exports = mongoose.model("reminders", ReminderSchema)