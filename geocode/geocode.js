
const request = require('request');

var geocodeAddress = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,	
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to google servers.');
		} else if (body.status === 'ZERO_RESULTS') {
			callback('Unable to find that adddress.');
		} else if (body.status === 'OK') {
			//we have to provide indefined because the errorMessage 
			//wont exist when things go well
			//and we are still requiring it as an arg in the declaration of our function
			//second arg is obj results
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		}
	});	
};

//we define a new property called .geocodeAddress that is = to our function of smae name
module.exports.geocodeAddress = geocodeAddress;


	
	