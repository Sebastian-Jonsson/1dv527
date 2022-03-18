

const modelController = {}

modelController.getModel = async (req, res, next) => {
    res.status(200).json({
        model: req.model
    })
}

module.exports = modelController