const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true,
        default: 'Standard',
    },
    description: {
        type: String,
        required: true
    },
    square: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    conveniences: [
        {
            _id: {
                type: Types.ObjectId,
                ref: 'Convenience'
            },
            quantity: {
                type: Number,
                default: 0
            }
        }
    ]
})

module.exports = model('Room', schema)