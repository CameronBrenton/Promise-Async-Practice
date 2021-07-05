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

/* Approach 2: convert async code to a Promise using util.promisify */
const readFilePromisified = util.promisify(fs.readFile);

readFilePromisified(filePath, "UTF-8")
.then(data => {
	console.log("[1] Printing the data");
	console.log(data.substr(0, 10))
})
.catch(error => {
	console.log("[2] Handling the error");
	console.lerror(error);
});

const promise1 = readFilePromisified(filePath, "UTF-8");

const fileName2 = "mb_5";
const filePath2 = path.resolve(__dirname, fileName2);
const promise2 = readFilePromisified(filePath2, "UTF-8");

const fileName3 = "mb_500";
const filePath3 = path.resolve(__dirname, fileName3);
const promise3 = readFilePromisified(filePath3, "UTF-8");

const fileName4 = "kb_5";
const filePath4 = path.resolve(__dirname, fileName4);
const promise4 = readFilePromisified(filePath4, "UTF-8");

const fileName5 = "kb_50";
const filePath5 = path.resolve(__dirname, fileName5);
const promise5 = readFilePromisified(filePath5, "UTF-8");

/* Testing Promise.all vs Promise.race */

const allPromises = Promise.all = Promise.all([promise1, promise2, promise3, promise4, promise5]);

allPromises
.then(results => {
	console.log("<1> Printing the data");

	for (const result of results) {
		console.log(result.substr(0, 10));
	}
})
.catch(error => {
	console.log("<2> Handling the error");

	console.log(error);
})
.finally(() => {
	console.log("Finished!");
});