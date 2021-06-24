const {Router} = require('express')
const router = Router()
const Room = require('../models/Room')
const config = require('config')

router.post('/create-room', async (request, response) => {
    try {
        const {title, description, square, cost, beds, conveniences} = request.body
        const room = new Room({
            title, description, square, cost, beds, conveniences
        })
        await room.save()
        response.status(201).json({message: 'Room is created!'})
    }
    catch (e) {
        response.status(500).json({message: 'Server error, please try again!'})
    }
})

router.get('/', async (request, response) => {
    try {
        const rooms = await Room.find({})
        response.json(rooms)
    }
    catch (e) {
        response.status(500).json({message: 'Server error, please try again!'})
    }
})

router.get('/:id', async (request, response) => {
    try {
        const room = await Room.findById(request.params.id)
        response.json(room)
    }
    catch (e) {
        response.status(500).json({message: 'Server error, please try again!'})
    }
})

module.exports = router