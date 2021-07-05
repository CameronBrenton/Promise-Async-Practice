/* Non-blocking async code using promises */

const fs = require('fs');
const path = require('path');
const util = require('util');

const fileName = "mb_50";
const filePath = path.resolve(__dirname, fileName);

const readFileWrappedInPromise = (filePath) => {
	console.log('1) Before the promise is returned');

	return new Promise((resolve, reject) => {
		console.log('2) now inside of the returned promise');

		fs.readFile(filePath, "UTF-8", function (error, data) {
			console.log('3) inside of the callback that is called when readFile is donw');

			if (error) {
				console.log('4a) about to reject with an error');
				reject(error);
			} else {
				console.log('4b) about to resolve with the data');
				resolve(data.substr(0, 10));
			}
		});
	});
};

readFileWrappedInPromise(filePath)
.then(data => {
	console.log('5a) received the data inside the .then')
	console.log(data);
})
.catch(error => {
	console.log('5b) handling the error inside the .catch');
	console.error(error);
})
.finally( () => {
	console.log('Finished read file operation');
});