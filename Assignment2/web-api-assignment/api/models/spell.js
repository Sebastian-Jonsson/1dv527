const mongoose = require('mongoose')

const spellSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: Number, 
        required: true,
        default: 0
    },
    castingTime: {
        type: String,
        required: true,
        default: '1 Action'
    },
    rangeOrArea: {
        type: String,
        required: true,
        default: 'Touch'
    },
    components: {
        type: String,
        required: true,
        default: 'None'
    },
    duration: {
        type: String,
        required: true,
        default: 'Instantaneous'
    },
    school: {
        type: String,
        required: true,
        default: 'None'
    },
    attackOrSave: {
        type: String,
        required: true,
        default: 'None'
    },
    damageOrEffect: {
        type: String,
        required: true,
        default: 'none'
    }
}, { timestamps: true })

module.exports = mongoose.model('Spell', spellSchema)