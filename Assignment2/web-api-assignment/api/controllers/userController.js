const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const respCodes = require('../../configs/respCodes')
const User = require('../models/user')

require('dotenv').config()

const userController = {}

/**
 * View all users.
 */
userController.viewUsers = async (req, res, next) => {
    await User.find()
    .select('-__v -password')
    .then(users => {
        if (users.length >= 0) {
            return respCodes.oK(req, res, "Users found and listed below.", users)
        }
        else {
            return respCodes.notFound(req, res, "No users were found.")
        }
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({ error: err })
    })
}

/**
 * Register user.
 */
userController.registerUser = async (req, res, next) => {
    const { email, password } = req.body

    await User.find({ email: email })
    .then(user => {
        if (user.length >= 1) {
            return respCodes.conflict(req, res, 'User already exists, make sure you have a valid email address.')
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email,
                password
            })
            user.save()
            .then(result => {
                console.log(result)
                return respCodes.created(req, res, 'User created', result)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: err })
            })
        }
    })
}

/**
 * Login specified user.
 */
userController.logInUser = async (req, res, next) => {
    const { email, password } = req.body

    await User.find({ email })
    .then(user => {
        if (user.length < 1) {
            return respCodes.unAuthorized(req, res, 'Authorization failed. Check your credentials again.')
        }
        bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) {
                return respCodes.unAuthorized(req, res, 'Authorization failed. Check your credentials again.')
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY, { expiresIn: process.env.JWT_TIME }
                )
                return respCodes.oK(req, res, 'Authenticated succesfully.', token)
            }
            return respCodes.unAuthorized(req, res, 'Authorization failed. Check your credentials again.')
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
}

/**
 * Delete specific user.
 */
userController.removeUser = async (req, res, next) => {
    await User.deleteOne({ _id: req.params.userId })
    .then(result => {
        return respCodes.oK(req, res, 'User unregistered.', result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
}


module.exports = userController