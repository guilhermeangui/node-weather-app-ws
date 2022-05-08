const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static folder to serve
app.use(express.static(publicDirPath))

const onSearchLocation = (res, { error, data }) => {
	if ( error ) return console.log(error)

	if ( data ) {
		const { latitude, longitude, location } = data

		if ( !latitude || !longitude || !location ) 
			return console.log('Error fetching latitude and longitude! :(')
		
		// console.log(`Forecast for ${location}`)

		forecast({
			latitude,
			longitude,
			callback: (data) => onSearchForecast(res, data)
		})
	}
}

const onSearchForecast = (res, { error, data }) => {
	if ( error ) return console.log(error)
	
	if ( data ) {
		const { weather_description, summary } = data

		if ( !weather_description || !summary ) 
			return console.log('Error fetching weather data! :(')
		
		// console.log(weather_description)
		// console.log(summary)

		res.send({
			forecast: weather_description,
			location: summary,
			address: summary,
		})
	}
}

app.get('', (req, res) => {
	res.render('index', { 
		title: 'app de clima',
		name: 'angui'
	})
})

app.get('/about', (req, res) => {
	res.render('about', { 
		title: 'sobre',
		name: 'angui'
	})
})

app.get('/help', (req, res) => {
	res.render('help', { 
		title: 'ajuda',
		name: 'angui',
		helpText: 'me ajudaaaaa'
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', { 
		title: '404',
		name: 'angui',
		errorMessage: 'Article not found',
	})
})


app.get('/weather', (req, res) => {
	console.log(req.query)
	// Receives a query string, ?address=santos
	// Example: http://localhost:3000/weather?address=santos

	if ( !req.query.address ) {
		return res.send({
			error: 'You must provide an address'
		})
	}

	geocode({ 
		address: req.query.address, 
		callback: (data) => onSearchLocation(res, data),
	})
})

app.get('*', (req, res) => {
	res.render('404', { 
		title: '404',
		name: 'angui',
		errorMessage: 'Page not found',
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000!')
})