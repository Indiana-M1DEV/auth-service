const removeFields = function (value) {
	if (value) {
		delete value.__v;
	}

	if (value instanceof Array) {
		Array.prototype.forEach.call(value, (val) => {
			delete val._id;
		});
	}

	return value;
};

module.exports = {
	removeFields,
};
