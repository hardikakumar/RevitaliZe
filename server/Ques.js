const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuesSchema = new Schema({
    ques: {
        type: String,
        length: 100
    },
    dosha: {
        type: String,
        length: 1
    },
    idx: {
        type: Number,
        length: 20
    },
}
)

module.exports = mongoose.model("questionnaires", QuesSchema)