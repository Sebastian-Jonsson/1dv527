module.exports = (req, res, next, data) =>  {
    if (req.headers.accept === 'application/json') {
        return res.status(200).json(data)
    }
    next()
}