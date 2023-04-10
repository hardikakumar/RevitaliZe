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
    Eczema: {
        type: Boolean,
        length: 10
    },
    Hyperthyroidism: {
        type: Boolean,
        length: 10
    },
    Hypothyroidism: {
        type: Boolean,
        length: 10
    },
    PCOD: {
        type: Boolean,
        length: 10
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