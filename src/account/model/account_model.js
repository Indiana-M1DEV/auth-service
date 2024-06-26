/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const accountSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
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
	cacheFound: {
		type: Number,
		default: 0,
	},
	cacheOrganised: {
		type: Number,
		default: 0,
	},
	collectedNFTs: {
		type: [String],
		default: [],
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
			username: this.username,
			isAdmin: this.roles.includes('admin'),
			isSubscribed: this.isSubscribed,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRATION_DAYS,
		}
	);
};

accountSchema.statics.findOrCreate = async function (conditions, doc) {
	const result = await this.findOne(conditions);
	if (result) {
		return [result, false];
	} else {
		const newDoc = new this(doc);
		await newDoc.save();
		return [newDoc, true];
	}
};

accountSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	return obj;
};

module.exports = mongoose.model('Account', accountSchema);
