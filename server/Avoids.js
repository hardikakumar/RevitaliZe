const mongoose = require("mongoose");
const { Schema } = mongoose;

const AvoidSchema = new Schema({
    fruits: {
        type: String
    },
    vegetables: {
        type: String
    },
    nuts: {
        type: String
    },
    Kapha: {
        type: Boolean,
    },
    Pitta: {
        type: Boolean,
    },
    Vata: {
        type: Boolean,
    },
}
)

module.exports = mongoose.model("avoids", AvoidSchema)