const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connect = async () => {
	try {
		await mongoose.connect(
			`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/`
		);
		console.log('Connected to database');
	} catch (err) {
		console.error('Error in connect:', err);
		throw err;
	}
};

module.exports = {
	connect,
};
