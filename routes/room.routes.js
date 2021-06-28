const {Router} = require('express')
const router = Router()
const Room = require('../models/Room')

router.post('/create', async (request, response) => {
    try {
        const {title, description, cost, square, beds, conveniences} = request.body
        const room = new Room({
            title, description, square, cost, beds,conveniences
        })
        await room.save()
        response.status(201).json({message: 'Room is created!', room})
    }
    catch (e) {
        console.log(e)
        response.status(500).json({message: 'Server error, please try again!'})
    }
})

router.get('/', async (request, response) => {
    try {
        const rooms = await Room.find({}).populate([{
            model: 'Convenience',
            path: 'conveniences._id'
        }])
        response.json(rooms)
    }
    catch (e) {
        response.status(500).json({message: 'Server error, please try again!'})
    }
})

router.get('/:id', async (request, response) => {
    try {
        const room = await Room.findById(request.params.id).populate([{
            model: 'Convenience',
            path: 'conveniences._id'
        }])
        response.json(room)
    }
    catch (e) {
        response.status(500).json({message: 'Server error, please try again!'})
    }
})

router.put('/edit/:id', async (request,response) => {
    try {
        const {title, description, cost, square, beds, conveniences} = request.body
        const updateRoom = await Room.findByIdAndUpdate({_id: request.params.id}, {title, description, cost, square, beds, conveniences})
        updateRoom.save()
        response.json({message: 'The room was successfully edited!'})
    }
    catch (e) {
        response.status(500).json({message: 'Update error, please try again!'})
    }
})

router.delete('/delete/:id', async (request, response) => {
    try {
        const roomId = request.params.id
        await Room.deleteOne({_id: roomId})
        response.json({message: 'Room successful deleted!'})
    }
    catch (e) {
        response.status(500).json({message: 'Server error, please try again!'})
    }
})

module.exports = router