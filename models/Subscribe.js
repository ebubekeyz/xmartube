const mongoose = require('mongoose')
const validator = require('validator')

const SubscribeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide a valid email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        },
        unique: true,
    }

},{ timestamps: true })

module.exports  = mongoose.model('Subscribe', SubscribeSchema)