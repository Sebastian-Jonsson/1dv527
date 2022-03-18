import { Container } from 'reactstrap'
import { useState, useEffect } from 'react'
const axios = require('axios')
const weatherSource = 'https://api-indoor-weather.herokuapp.com/api/v1/properties'

/* https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
    https://reactjs.org/docs/hooks-effect.html
*/


function Weather() {
    
    const [temperatureData, setTemperatureData] = useState([])
    const [humidityData, setHumidityData] = useState([])
    const [evaluationData, setEvaluationData] = useState([])
    const [evaluationShow, setEvaluationShow] = useState(false)
    const [swapTemperature, setSwapTemperature] = useState(false)

    const lowTemperature = 17.5
    const highTemperature = 25.5
    const lowHumidity = 30.0
    const highHumidity = 60.0
        
    useEffect(() => {
        axios.get(weatherSource)
            .then(res => {
            setTemperatureData(res.data.temperature.values.current.value)
            setHumidityData(res.data.humidity.values.current.value)
            })
        const interval = setInterval(() =>{
            axios.get(weatherSource)
            .then(res => {
            setTemperatureData(res.data.temperature.values.current.value)
            setHumidityData(res.data.humidity.values.current.value)
            })
        }, 10000)
        return () => clearInterval(interval)
    }, []
    )

    const convertToF = (celcius) => {
        return ((celcius * 1.8) + 32).toFixed(2)
    }

    /* https://www.sensitivechoice.com/indoor-humidity/ */
    const onEvaluationClick = () => {
        setEvaluationShow(!evaluationShow)
        
        let data = ''

        let temp = parseFloat(temperatureData)
        let humidity = parseFloat(humidityData)
        
        if(temp < lowTemperature) {
            data += `It's cold inside, increase the heat.`
        }
        if(temp > highTemperature) {
            data += `It's hot inside, lower the heat.`
        }
        if(humidity < lowHumidity) {
            data += `Low humidity, try ventilating.`
        }
        if(humidity > highHumidity) {
            data += `High humidity, try to circulate warm air.`
        }
        else if(humidity > lowHumidity && humidity < highHumidity && temp > lowTemperature && temp < highTemperature) {
           data += 'Optimal levels of temperature and humidity!'
        }

        setEvaluationData(data)
    }


    const onTemperatureClick = () => {
        convertToF(temperatureData)
        setSwapTemperature(!swapTemperature)
    }

    return (
        <div className='backgroundImage'>
        <Container className='weatherBox' fluid={true}>
        {/* <input type="button" value="℉/℃" onClick={onTemperatureClick} /> */}


            <h3>Temperature</h3>
            <p className='temperaturePulse' type='button' onClick={onTemperatureClick}>
                {swapTemperature ? `${convertToF(temperatureData)} Farhenheit/℃` : `${temperatureData} Celcius/℉` } 
                </p>

            <h3>Humidity</h3>
            <p className='humidityPulse'>{humidityData} %</p>
            <div className='textFitting'>
            <h3>Indoor Evaluation</h3>
            <p className='' type='button' onClick={onEvaluationClick}>{evaluationShow ? `${evaluationData}` : 'Show/Hide'}</p>
            </div>

        </Container>
    </div>
    )
}

export default Weather
