const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connect = () => {
	mongoose
		.connect(
			// 'mongodb://indiana:1nd14n4-D3v@indiana-auth-db:27017/?authMechanism=SCRAM-SHA-256&authSource=admin'
			`mongodb://${process.env.DATABASE_LOG}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/?authMechanism=${process.env.AUTH_MECANISM}&authSource=${process.env.AUTH_SOURCE}`
		)
		.then(() => console.log('Connected to MongoDB'))
		.catch((err) => console.error('Error connecting to MongoDB', err));
};

module.exports = {
	connect,
};
