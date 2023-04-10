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
        type: String,
        length: 10
    },
    Hyperthyroidism: {
        type: String,
        length: 10
    },
    Hypothyroidism: {
        type: String,
        length: 10
    },
    PCOD: {
        type: String,
        length: 10
    }
}
)

module.exports = mongoose.model("remedies", RemedySchema)