/* https://www.w3.org/Submission/wot-model/#r0.5-a-web-thing-must-support-json-as-default-representation */

const router = require('express').Router()
const checkHeaderAccept = require('../middleware/checkAccept')

const rootController = require('../controllers/rootController')
const propertiesController = require('../controllers/propertiesController')
const modelController = require('../controllers/modelController')

router.get('/', checkHeaderAccept, rootController.getRoot)
router.get('/properties', checkHeaderAccept, propertiesController.getProperties)
router.get('/model', checkHeaderAccept, modelController.getModel)


module.exports = router