const mongoose = require("mongoose");
const { Schema } = mongoose;

const RemedySchema = new Schema({
    RemedyName: {
        type: String,
        length: 100
    },
    Description: {
        type: String,
        length: 100
    },
    medicalCondition: {
        type: String,
    },
    Type: {
        type: String,
        length: 10
    },
    Dosha: {
        type: String,
        length: 10
    }
}
)

module.exports = mongoose.model("remedies", RemedySchema)