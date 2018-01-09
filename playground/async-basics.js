console.log('Starting App!'); //this (console.log) sync, 'starting app' will print


//using Node's setTimeout async function -> non-blocking
//2 arg 1) callback function 2) milisec to wait
setTimeout(() => {
	console.log('Inside callback');
}, 2000);

setTimeout(() => {
	console.log('What??');
}, 0);


console.log('Finishing up');