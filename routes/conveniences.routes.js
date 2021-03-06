const {Router} = require('express')
const router = Router()
const Convenience = require('../models/Convenience')

router.post('/create', async (request, response) => {
    try {
        const {title, manufacturer} = request.body
        const convenience = new Convenience({title, manufacturer})
        await convenience.save()
        response.status(201).json({message: 'Convenience is created!'})
    }
    catch (e) {
        response.status(500).json({message: 'Server error, please try again!'})
    }
})

// /api/convenience/
router.get('/', async (request, response) => {
    try {
        const convenience = await Convenience.find({})
        response.json(convenience)
    }
    catch (e) {
        response.status(500).json({message: 'Server error, please try again!'})
    }
})

router.delete('/delete/:id', async (request, response) => {
    try {
        const idConvenience = request.params.id
        await Convenience.deleteOne({_id: idConvenience})
        response.status(200).json({message: 'Convenience successful deleted!'})
    }
    catch (e) {
        response.status(500).json({message: 'Server error, please try again!'})
    }
})

module.exports = router