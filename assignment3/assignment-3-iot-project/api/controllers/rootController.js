const rootController = {}


rootController.getRoot = async (req, res, next) => {
    let url = `${req.protocol}://${req.headers.host}${req.originalUrl}`

    res.status(200).json({
        meta: {
            license: 'ISC',
            title: 'Indoor Weather API',
            author: 'Sebastian Jonsson',
            version: 'v1',
            contentType: 'application/json',
            description: 'An indoor project measuring temperature and humidity.'
        },
        id: url,
        name: 'Indoor Weather Station',
        description: 'An indoor project measuring temperature and humidity.',
        tags: [
            'raspberry',
            'pi',
            '3b',
            'device',
            'WoT'   
        ],
        customFields: {
            temperature: 'celcius',
            humidity: '%'
        },
        links: {
            model: {
                link: `${url}/model`,
                title: 'Model of Indoor Weather Readings.'
            },
            properties: {
                link: `${url}/properties`,
                title: 'Properties of Indoor Weather Readings.'
            }
        }
    })
}

module.exports = rootController