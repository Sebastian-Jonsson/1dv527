const router = require('express').Router()

const controller = require('../controllers/hookController')
const checkAuth = require('../middlewares/jwtVerify')

/**
 * https://zapier.com/engineering/webhook-design/
 */
router.get('/', controller.viewHooks)

router.post('/', checkAuth, controller.createHook)

router.delete('/:hookId', checkAuth, controller.removeHook)

module.exports = router