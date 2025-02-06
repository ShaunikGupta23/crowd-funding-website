const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
   
    charityName: {
        type: String,
        required: true
    },
    donorName : {
        type: String,
        required: true
    },
    amount : {
        type: Number,
        required: true
    }

})

const Donations = mongoose.model("donations", donationSchema)
module.exports = Donations