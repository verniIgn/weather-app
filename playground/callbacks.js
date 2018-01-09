//EXAMPLES OF CALLBACK

//simulates getting data from a db or api
//first arg is id of the usr we're retriving
//second arg is callback func
//This means: go get the user, once you have it exe callback func --> we 
//call the callback func with the data we just got
var getUser = (id, callback) => {
	//this a dummy obj, like the one we would be getting
	//for real from the db or api thru db queries
	var user = {
		id: id,
		name: 'Juan'
	};

	setTimeout(() => {
		//now we need to call the callback function
		callback(user);
	}, 3000);
	
};

//This simulates how a callback works -> we're passing 
//the callback as an arg
//The arg (user)is the data that gets returned from the db or api
//Now that we have thst data, the callback func gets executed
getUser(23, (userObj) => {
	console.log(userObj);
});