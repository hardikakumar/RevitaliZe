const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({

    name: {
        type: String,
        length: 100
    },
    age: {
        type: Number,
        length: 2
    },
    gender: {
        type: String,
        length: 1
    },
    email: {
        type: String,
        length: 100
    },
    encryptedPasscode: {
        type: String,
        length: 20
    },
    phone:
    {
        type: String,
        length: 14
    },
    password: {
        type: String,
        length: 20
    },
    member_id: {
        type: String,
        length: 29
    },
}
)

module.exports = mongoose.model("users", UserSchema)