const request = require('postman-request')

const forecast = ({
	latitude,
	longitude,
	callback
}) => {
	const url = `http://api.weatherstack.com/current?access_key=c275b96668431d78da73d4d031c0e8dc&query=${latitude},${longitude}`

	request({ url, json: true, }, (error, response) => {
		if ( error ) {
			callback({ error: 'Unable to connect to location services!' })
		} else if ( response.body.error ) { 
			callback({ error: 'Unable to find location! Try another place' })
		} else {
			const data = response.body.current

			const temperature = data.temperature
			const feelslike = data.feelslike
			const weather_description = data.weather_descriptions[0]

			callback({
				data: {
					weather_description, 
					summary: `It is currently ${temperature}ºC degrees out. And it feels like ${feelslike}ºC!`
				}
			})
		}
	})
}


module.exports = forecast