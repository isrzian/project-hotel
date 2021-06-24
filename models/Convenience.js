const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    }
})

module.exports = model('Convenience', schema)