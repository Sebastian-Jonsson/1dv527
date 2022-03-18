const router = require('express').Router()

const controller = require('../controllers/userController')
const checkAuth = require('../middlewares/jwtVerify')


router.get('/', controller.viewUsers)

router.post('/', controller.registerUser)

router.post('/log-in', controller.logInUser)

router.delete('/:userId', checkAuth, controller.removeUser)


module.exports = router