const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReminderSchema = new Schema({
    reminderMsg: {
        type: String
    },
    remindAt: {
        type: String
    },
    isReminded: {
        type: Boolean
    }
}
)

module.exports = mongoose.model("reminders", ReminderSchema)