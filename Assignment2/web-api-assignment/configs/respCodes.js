require('dotenv').config()

const respCodes = {}

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */

respCodes.oK = (req, res, text, asset) => {
    res.status(200).json({
        message: text,
        asset,
        links: links(req, asset._id)
    })
}

respCodes.created = (req, res, text, asset) => {
    res.status(201).json({
        message: text,
        asset,
        links: links(req, asset._id)
    })
}

respCodes.unAuthorized = (req, res, text) => {
    res.status(401).json({
        message: text,
        links: links(req, res)
    })
}

respCodes.notFound = (req, res, text) => {
    res.status(404).json({
        message: text,
        links: links(req, res)
    })
}

respCodes.conflict = (req, res, text) => {
    res.status(409).json({
        message: text,
        links: links(req, res)
    })
}

links = (req, receivedId) => {
    if (receivedId) {
            recId = `${req.originalUrl}/${receivedId}`
        } 
        else {
            recId = `${req.originalUrl}`
    }
    return {
        links: {
            root: {
                method: 'GET',
                accessRights: 'Not Required.',
                url: `${req.protocol}://${req.headers.host}/api`
            },
            self: {
                method: req.method,
                requestedURL: `${req.protocol}://${req.headers.host}${recId}`,

            },
            subscribe: {
                method: 'GET, POST, DELETE',
                url: `${req.protocol}://${req.headers.host}/api/${process.env.API_VERSION}/webhooks`
            }
        }
    }
}

module.exports = respCodes