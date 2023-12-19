const passport = require('passport');
const Account = require('../../account/model/account_model');
const { removeFields } = require('../../utils/remover');

const googleAuth = passport.authenticate('google', {
	scope: ['email', 'profile'],
});

const googleAuthCallback = async (req, res) => {
	try {
		const user = req.user[0];
		console.log(user);
		const email = user.email;
		const firstName = user.firstName;
		const lastName = user.lastName;

		const [account] = await Account.findOrCreate(
			{
				email,
			},
			{
				firstName,
				lastName,
				provider: 'google',
				status: 'active',
			}
		);

		const token = account.generateJwt();

		return res.status(200).json({
			account: removeFields(account.toObject()),
			token,
		});
	} catch (err) {
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
};

const authFailure = (req, res) => {
	res
		.status(401)
		.send('Oops something went wrong with Google. Authentication Failed');
};

module.exports = {
	googleAuth,
	googleAuthCallback,
	authFailure,
};
