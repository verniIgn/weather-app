const yargs = require('yargs');		
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')	
	.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address');
	}

	var lat = response.data.results[0].geometry.location.lat;
	var long = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/28f09ceebd9abc457843f66c32f26587/${lat},${long}`;
	console.log('===========================================');
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl);

}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	var humidity = response.data.currently.humidity;
	var precipProb = response.data.currently.precipProbability;
	var summary = response.data.currently.summary;
	var weekly = response.data.daily.summary;

	console.log('===========================================');
	console.log(`Right now: ${summary}.`);
	console.log(`It's currently ${temperature} F. It feels like ${apparentTemperature} F.`);
	console.log(`Humidity: ${humidity}%.`);
	console.log(`Rain probability: ${precipProb}%.`);
	console.log(`Rest of the week: ${weekly}.`);
	console.log('===========================================');


}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers');
	} else {
		console.log(e.message);
	}
});


	




