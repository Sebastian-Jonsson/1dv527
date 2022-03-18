const mongoose = require('mongoose')
const Hook = require('../models/hook')
const respCodes = require('../../configs/respCodes')

const hookController = {}


/**
 * View all hooks. References below were helpful in learning.
 * 
 * https://github.com/Automattic/mongoose/issues/6546
 * https://www.javaer101.com/en/article/18577356.html
 */
hookController.viewHooks = async (req, res, next) => {
    await Hook.find()
    .select('-__v')
    .then(hooks => {
        if (hooks.length >= 0) {
            return respCodes.oK(req, res, "Hooks found and listed below.", hooks)
        }
        else {
            return respCodes.notFound(req, res, "No hooks were found.", hooks)
        }
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({ error: err })
    })
}

/**
 * Create a new hook.
 */
hookController.createHook = async (req, res, next) => {
    await Hook.find({url: req.body.url})
    .then(hook => {
        if (hook.length >= 1) {
            return respCodes.conflict(req, res, 'Hook already exists.')
        }
        else {
            const newHook = new Hook({
                _id: new mongoose.Types.ObjectId(),
                url: req.body.url,
                representiveName: req.body.representiveName
            })
            newHook.save().then((result) => {
                return respCodes.created(req, res, 'Hook created.', result)
            })
            .catch(err => {
                console.error(err)
                res.status(500).json({ error: err })
            })
        }
    })
}

/**
 * Remove a specific hook.
 */
hookController.removeHook = async (req, res, next) => {
    const id = req.params.hookId
    await Hook.deleteOne({ _id: id})
    .then(result => {
        respCodes.oK(req, res, 'Hook removed.', result)
    })
    .catch(err => {
        console.error(err)
        res.status(500).json({ error: err })
    })
}


module.exports = hookController 