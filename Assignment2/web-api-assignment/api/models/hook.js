const mongoose = require('mongoose')

const hookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: { 
        type: String,
        unique: true,
        required: true
    },
    representiveName: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Hook', hookSchema)