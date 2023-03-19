const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        length: 100
    },
    age: {
        type: String,
        length: 2
    },
    gender: {
        type: String,
        length: 100
    },
    email: {
        type: String,
        length: 100
    },
    encryptedPasscode: {
        type: String,
        length: 20
    },
    userId: {
        type: String,
        length: 20
    }
}
)

module.exports = mongoose.model("users", UserSchema)