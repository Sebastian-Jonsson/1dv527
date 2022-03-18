/* https://www.w3.org/Submission/wot-model/#model-resource 
https://medium.com/edureka/node-js-requests-6b94862307a2
*/

module.exports = async (req, res, next) => {
    let url = `${req.protocol}://${req.headers.host}${req.originalUrl}`

    const model = {
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
        links: {
            product: {
                link: 'https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/',
                title: 'Product this Indoor Weather Thing is based on.'
            },
            properties: {
                link: `${url}/properties`,
                title: 'Properties of Indoor Weather Readings.',
                resources: {
                    temperature: {
                        name: 'Temperature Sensor',
                        description: 'Ambient Temperature Sensor.',
                        values: {
                            temp: {
                                name: 'Temperature Sensor',
                                description: 'Temperature in celcius degrees.',
                                unit: 'celcius',
                                customFields: {
                                    gpio: '4'
                                }
                            }
                        },
                        tags: [
                            'sensor',
                            'public',
                            'indoors'
                        ]
                    },
                    humidity: {
                        name: 'Humidity Sensor',
                        description: 'Ambient Humidity Sensor.',
                        values: {
                            h: {
                                name: 'Humidity Sensor',
                                description: 'Humidity in percents.',
                                unit: '%',
                                customFields: {
                                    gpio: '4'
                                }
                            }
                        },
                        tags: [
                            'sensor',
                            'public'
                        ]
                    }
                },
                type: {
                    link: 'https://www.w3.org/Submission/wot-model/',
                    title: 'Instance type of the raspberry Pi'
                },
                help: {
                    link: 'https://webofthings.org/standards/',
                    title: 'Documentation'
                },
                ui: {
                    link: `${req.protocol}://${req.headers.host}/api/v1`,
                    title: 'JSON User Interface'
                }
            }
        }
    }

    req.model = model
    next()
}