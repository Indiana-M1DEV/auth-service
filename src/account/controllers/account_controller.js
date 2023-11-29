const Account = require('../model/account_model');

const deleteAccount = async (req, res) => {
	const { email } = req.body;

	try {
		const account = await Account.findOneAndDelete({ email });
		if (!account) {
			return res.status(404).json({ error: 'Account not found' });
		}

		return res.status(204).end();
	} catch (err) {
		return res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = { deleteAccount };
