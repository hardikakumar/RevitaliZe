const mongoose = require("mongoose");
const { Schema } = mongoose;

const DoshaReportSchema = new Schema({
    // dosha_id: {
    //     type: String,
    //     length:10
    // },
    member_id: {
        type: String,
        length: 100
   },
   date: {
         type: String,
         length: 10
   },
    vatta: {
        type: Number,
        length: 10
    },
    pitta: {
        type: Number,
        length: 10
    },
    kapha: {
        type: Number,
        length: 10
    },
    
}
)

module.exports = mongoose.model("doshareports", DoshaReportSchema)