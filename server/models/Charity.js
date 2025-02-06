const mongoose = require('mongoose')

const charitySchema = new mongoose.Schema({
   
    charityName: {
        type: String,
        required: true
    },
    objective : {
        type: String,
        required: true
    },
    startDate : {
        type: Date,
        required: true
    }

})

const Charities = mongoose.model("charities", charitySchema)
module.exports = Charities