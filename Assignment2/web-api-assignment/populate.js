const Spell = require('./api/models/spell')
const User = require('./api/models/user')
const { readJSON } = require('fs-extra')
require('dotenv').config()

const mongoDB = require('./configs/mongoose')
const mongoose = require('mongoose')

/**
* https://stackabuse.com/reading-and-writing-json-files-with-node-js/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
* https://www.codota.com/code/javascript/functions/fs-extra/readJson
 */



async function populate() {
    try {
        console.log('Start')
        mongoDB.connect(process.env.MONGODB_CONNECTION).catch(error => {
            console.error(error)
            process.exit(1)
        })

        const users = await readJSON('./population_data/userData.json')
        const spells = await readJSON('./population_data/spellData.json')
        
        for(const user of users) {
            const {email, password} = user
            const popUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email,
                password
            })
            await popUser.save()
        }

        for(const spell of spells) {
            const {name, level, castingTime, rangeOrArea, components, duration, school, attackOrSave, damageOrEffect } = spell
            const popSpell = new Spell({
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
            await popSpell.save()
        }
        console.log('Database populated with Users and Spells.')
        
        process.exit(0)
    }
    catch (err) { 
        console.log(err)
        process.exit(1)
    }
}

populate()
