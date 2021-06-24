const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: true
    },
    rooms: [
        {
            type: Types.ObjectId,
            ref: 'Room'
        }
    ]
})

module.exports = model('User', schema)