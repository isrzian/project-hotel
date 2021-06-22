const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email!').isEmail(),
        check('password', 'The minimum password length is 6 characters!').isLength({min: 6})
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return response(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during registration!'
                })
            }
            const {email, password} = request.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return response.status(400).json({message: "This user already exists!"})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email,
                password: hashedPassword
            })
            await user.save()
            response.status(201).json({message: "User is created!"})
        }
        catch (e) {
            response.status(500).json({message: "Register is failed, try again!"})
        }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter the correct email address!').normalizeEmail().isEmail(),
        check('password', 'Enter the correct password!').exists()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                return response(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during login!'
                })
            }
            const {email, password} = request.body
            const user = await User.findOne({email})
            if (!user) {
                return response.status(400).json({message: 'Error!'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return response.status(400).json({message: 'Error! Try again!'})
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecretKey'),
                {expiresIn: '2h'}
            )
            response.status(200).json({token, userId: user.id})
        }
        catch (e) {
            response.status(500).json({message: "Error, try again!"})
        }
})

module.exports = router