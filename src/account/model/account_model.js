/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const accountSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	status: {
		type: String,
		enum: ['active', 'pending', 'inactive'],
		default: 'pending',
	},
	provider: {
		type: String,
		default: 'local',
	},
	isSubscribed: {
		type: Boolean,
		default: false,
	},
	roles: {
		type: String,
		enum: ['admin', 'organisator', 'user'],
		default: 'user',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

accountSchema.pre('save', function (next) {
	const account = this;

	if (!account.isModified('password')) next();

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(account.password, salt, function (err, hash) {
			if (err) return next(err);

			account.password = hash;
			next();
		});
	});
});

accountSchema.methods.comparePassword = function (candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return callback(err);

		callback(null, isMatch);
	});
};

accountSchema.methods.generateJwt = function () {
	const today = new Date();
	const expirationDate = new Date(today);

	expirationDate.setDate(today.getDate() + process.env.JWT_EXPIRATION_DAYS);

	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRATION_DAYS,
		}
	);
};

module.exports = mongoose.model('Account', accountSchema);
