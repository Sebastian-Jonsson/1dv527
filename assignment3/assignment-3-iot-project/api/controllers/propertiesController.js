const fetch = require('node-fetch')

/* https://learn.adafruit.com/adafruit-io/mqtt-api 

*/


const propertiesController = {}

propertiesController.getProperties = async (req, res, next) => {
    try {
        const weatherData = await getLastWeatherValues()
       
            if (weatherData.length >= 1) {
                const resourceList = req.model.links.properties.resources

                let i = 0
                for (let values in resourceList) {
                    resourceList[values].values.current = weatherData[i]
                    i++
                }
                console.log(resourceList)

                return res.status(200).json(resourceList)
            }
            else {
                return res.status(404).json()
            }
    } catch (error) {
        return res.status(500).json()
    }
}

async function getLastWeatherValues() {
    const weatherData = await fetch(`https://io.adafruit.com/api/v2/${process.env.ADAFRUIT_USERNAME}/feeds`, 
    {
        headers: { 'x-aio-key': process.env.ADAFRUIT_KEY }
    })

    const data = await weatherData.json()

    const mapData = data.map(weather => ({
        name: weather.name,
        value: weather.last_value,
        timestamp: new Date().toLocaleString()
    }))

    return mapData
}

module.exports = propertiesController