const yargs = require('yargs');		
const axios = require('axios');

//obj that stores the final parse output
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

//.get is an axios method to make http requests
//don't need to tell if it's JSON or not, it will know automatically
//.get always returns promise
//
axios.get(geocodeUrl).then((response) => {
	//forcing en error to go directly to .catch()
	//if we get zero results (user entered wrong address)
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address');
	}

	var lat = response.data.results[0].geometry.location.lat;
	var long = response.data.results[0].geometry.location.lng;
	var weatherUrl = `https://api.darksky.net/forecast/28f09ceebd9abc457843f66c32f26587/${lat},${long}`;
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl);

}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers');
	} else {
		//print message from new Error
		console.log(e.message);
	}
});


//name of this app?
//load more information
//default location?




