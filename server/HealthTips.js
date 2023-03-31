const mongoose = require("mongoose");
const { Schema } = mongoose;

const HealthSchema = new Schema({
    data: {
        type: String,
        length: 100
    },
}
)

module.exports = mongoose.model("healthtips", HealthSchema)