const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

/**
 * RegEx borrowed.
 */
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String,
        required: true,
        unique: true,
        match: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/
    },
    password: { 
        type: String,
        required: true 
    },
}, { timestamps: true })

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12)
})

module.exports = mongoose.model('User', userSchema)