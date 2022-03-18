const mongoose = require('mongoose')
const Spell = require('../models/spell')
const respCodes = require('../../configs/respCodes')
const { sendHook } = require('../middlewares/sendHook')

require('dotenv').config()

const spellController = {}


/**
 * Get all spells. References were helpful in learning.
 * 
 * https://bezkoder.com/mongodb-many-to-many-mongoose/
 * https://www.javaer101.com/en/article/18577356.html
 */
spellController.showSpells = async (req, res, next) => {
    await Spell.find()
    .select('-__v')
    .then(spells => {
        if (spells.length >= 0) {
            return respCodes.oK(req, res, 'Showing all spells.', spells)
        }
        else {
            return respCodes.notFound(req, res, 'No spells found.')
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
}

/**
 * Get a specific spell.
 * 
 * https://www.javaer101.com/en/article/18577356.html
 */
spellController.findSpell = async (req, res, next) => {
    const id = req.params.spellId
    await Spell.findById(id)
    .select('-__v')
    .then(spell => {
        if (spell) {
            return respCodes.oK(req, res, 'Spell found.', spell)
        } 
        else {
            return respCodes.notFound(req, res, 'No valid entry found for specified ID.')
        }
    })
    .catch(err => {
        res.status(404).json({ 
            error: err,
            message: 'Invalid Id.',
            self: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
            link: {
                method: 'GET',
                accessRights: 'Not Required.',
                description: 'The Root of the API.',
                url: `${req.protocol}://${req.headers.host}/api`
            }
        })
    })
}

/** 
 * Post and create a new spell.
 */
spellController.createSpell = async (req, res, next) => {
    const {name, level, castingTime, rangeOrArea, components, duration, school, attackOrSave, damageOrEffect } = req.body

    await Spell.find({ name: name })
    .then(spell => {
        if (spell.length >= 1) {
            return respCodes.conflict(req, res, 'Spell already exists, change the name of the spell.')
        }
        else {
            const spell = new Spell({
                _id: new mongoose.Types.ObjectId(),
                name,
                level,
                castingTime,
                rangeOrArea,
                components,
                duration,
                school,
                attackOrSave,
                damageOrEffect
            })
            sendHook(spell)
            spell.save().then((result) => {
                console.log(result)
                return respCodes.created(req, res, 'Spell succesfully created.', result)
            })
            .catch(err => {
                console.error(err)
                res.status(404).json({
                    error: err,
                    message: 'Invalid Id.',
                    self: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
                    link: {
                        method: 'GET',
                        accessRights: 'Not Required.',
                        description: 'The Root of the API.',
                        url: `${req.protocol}://${req.headers.host}/api`
                    }
                })
            })
        }
    })
}

/**
 * Update a specific spell.
 */
spellController.editSpell = async (req, res, next) => {
    const id = req.params.spellId
    const updateSpells = {}
    for (const spells of req.body) {
        updateSpells[spells.propName] = spells.value
    }
    await Spell.updateOne({ _id: id },
        { $set: updateSpells })
        .then(e => {
            return respCodes.oK(req, res, 'Spell was updated.', id)
        })
        .catch(err => {
        console.log(err)
        res.status(404).json({
            error: err,
            message: 'Invalid Id.',
            self: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
            link: {
                method: 'GET',
                accessRights: 'Not Required.',
                description: 'The Root of the API.',
                url: `${req.protocol}://${req.headers.host}/api`
            }
        })
        })
}

/**
 * Delete a specific spell.
 */
spellController.deleteSpell = async (req, res, next) => {
    const id = req.params.spellId
    await Spell.deleteOne({ _id: id })
    .then(e => {
        return respCodes.oK(req, res, 'Spell was removed.', id)
    })
    .catch(err => {
        console.log(err)
        res.status(404).json({
            error: err,
            message: 'Invalid Id.',
            self: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
            link: {
                method: 'GET',
                accessRights: 'Not Required.',
                description: 'The Root of the API.',
                url: `${req.protocol}://${req.headers.host}/api`
            }
        })
    })
}


module.exports = spellController