const weatherForm = document.querySelector('form')
const resultTitle = document.querySelector('#result-title')
const resultDescription = document.querySelector('#result-description')

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const addressInputValue = document.querySelector('input').value
	const queryString = `/weather?address=${addressInputValue}`

	resultTitle.textContent = 'Loading...'

	// Getting the weather
	fetch(queryString).then(( response ) => {
		response.json().then((data) =>  {
			if (data.error) {
				resultTitle.textContent = data.error
			} else {
				resultTitle.textContent = data.location
				resultDescription.textContent = data.forecast
			}
		})
	})
})