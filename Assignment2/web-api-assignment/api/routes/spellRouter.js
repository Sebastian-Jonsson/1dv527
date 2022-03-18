const router = require('express').Router()

const controller = require('../controllers/spellController')
const checkAuth = require('../middlewares/jwtVerify')


router.get('/', controller.showSpells)

router.get('/:spellId', controller.findSpell)

router.post('/', checkAuth, controller.createSpell)

router.patch('/:spellId', checkAuth, controller.editSpell)

router.delete('/:spellId', checkAuth, controller.deleteSpell)


module.exports = router