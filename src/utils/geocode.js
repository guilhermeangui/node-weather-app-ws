const request = require('postman-request')

const geocode = ({ address, callback }) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5ndWlzc2F1cm8iLCJhIjoiY2wwb3JpNTdhMW01cDNrcnZ1eHVpcmc1OSJ9.sddErgAU13LxNaB4OI-LIw&limit=1'

	request({ url, json: true}, (error, response) => {
		if ( error ) {
			callback({ error: 'Unable to connect to location services!' })
		} else if ( response.body.features.length === 0 ) {
			callback({ error: 'Unable to find location! Try another place' })
		} else {
			callback({
				data: {
					latitude: response.body.features[0].center[1],
					longitude: response.body.features[0].center[0],
					location: response.body.features[0].place_name
				}
			})
		}
	})
}

module.exports = geocode
