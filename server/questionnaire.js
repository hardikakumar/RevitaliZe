const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuesSchema = new Schema({
    question: {
        type: String,
        length: 100
    },
    dosha: {
        type: String,
        length: 1
    },
}
)

module.exports = mongoose.model("questionnaire", QuesSchema)