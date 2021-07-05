/* Async Await */

const fs = require('fs');
const path = require('path');
const { mainModule } = require('process');
const util = require('util');

const fileName = "mb_50";
const filePath = path.resolve(__dirname, fileName);

/* Approach 1: Wrap async code inside of new Promise */
const readFileWrappedInPromise = (filePath) => {
	console.log('1) before promise is returned');

	return new Promise((resolve, reject) => {
		console.log('2) now inside of the returned promise');

		const callback = (error, data) => {
			console.log('3) inside of the callback that is called when readFile is done');

			if(error) {
				console.log('4a) about to reject with an error');
				reject(error);
			} else {
				console.log('4b) about to resolve with the data');
				resolve(data.substr(0, 10));
			}
		};
		fs.readFile(filePath, "UTF-8", callback);
	});
};

/* Use 1: A function that returns a promise containing another function using callbacks */
readFileWrappedInPromise(filePath)
.then(data => {
	console.log('5a) received the data inside of .then');
	console.log(data);
})
.catch(error => {
	console.log('5b) handling the error inside of .catch');
	console.error(error);
})
.finally(() => {
	console.log("Finished read file operation");
});

/* Use 2: A function that returns a promise because it uses the 'async' keyword */
async function testAsync2() {
	try { //Try to do something
		console.log('Before doing anything');
		const data = await readFileWrappedInPromise(filePath);
		console.log('data: ', data);
	}
	catch (error) { // Catch any errors that may have occurred during the 'try'
		console.error(error);
	}
	finally { // Regardless of what happens, do the following
		console.log("Finished read file operation");
	}
}

testAsync();

/* Approach 2: convert async code to a Promise using util.promisify */
const readFilePromisified = util.promisify(fs.readFile);

readFilePromisified(filePath, "UTF-8")
.then(data => {
	console.log("[1] Printing the data");
	console.log(data.substr(0, 10));
})
.catch(error => {
	console.log("[2] Handling the error");
	console.error(error);
});

/* Usage v2: A function that uses await to execute the promisified function */
async function testAsync2() {
	try {
		console.log("before doing anything");
		const data = await readFilePromisified(filePath, "UTF-8");
		console.log("data: ", data.substr(0, 10));

		return data.substr(0, 10);
	}
	catch (error) {
		console.error(error);
	}
	finally {
		console.log("Finished read file operation");
	}
}

/* Usage v2a: .then style */
testAsync2()
.then(substr => {
	console.log("returned data: ", substr);
})

// Usage v2b: Anonymous/root function call
(async function () {
	const substr = await testAsync2();
	console.log("Returned data: ", substr);
})()

// Demonstration of how to write promises and async code

function getUsers() {
	return new Promise(function(resolve, reject) {
	    // do stuff
	});
}
    
const getUsers = () => {
	return new Promise(function(resolve, reject) {
	    // do stuff
	});
}
    
async function getUsers() {
	// do stuff
	// await 
}
    
const getUsers = async () => {
	// do stuff
};