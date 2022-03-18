let sensor = require('node-dht-sensor')
let mqtt = require('mqtt')
require('dotenv').config()

/* This code is written on the raspberry without gitlab branched. 
https://www.npmjs.com/package/mqtt
*/


let user = process.env.ADAFRUIT_USERNAME

const client = mqtt.connect('mqtts://io.adafruit.com', {
	port: 8883,
	username: user,
	password: process.env.ADAFRUIT_KEY
})

client.on('connect', () => {
	console.log('Connected to Adafruit.')
	
	client.subscribe(`${user}/feeds/temperature`)
	client.subscribe(`${user}/feeds/humidity`)
	
	const interval = setInterval(() => {
		weatherReading(client)
	}, 10000)
	
})

client.on('close', () => {
	console.log('Connection to Adafruit closed.')
})

const weatherReading = (client) => {

	sensor.read(22, 4, (error, temperature, humidity) => {
		if (error) {
			console.log(error)
			}
			else {
			console.log('Temperature: ' + temperature.toFixed(1) + ' || Humidity: ' + humidity.toFixed(1))
			
			client.publish(`${user}/feeds/temperature`, temperature.toFixed(1))
			client.publish(`${user}/feeds/humidity`, humidity.toFixed(1))
			
			}
		})
		
		process.on('SIGINT', () => {
		clearInterval(weatherReading)
		console.log('Shut down.')
		process.exit()
		})
}


