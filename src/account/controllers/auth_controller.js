const jwt = require('jsonwebtoken');

const Account = require('../model/account_model');
const { emailValidator, passwordValidator } = require('../validators');
const { getUrl } = require('../../../utils/getter');
const sendMail = require('../../../utils/sendmail');

const {
	confirmationEmail,
} = require('../../../utils/email-templates/auth/validation/validation');

const login = async (req, res) => {
	const { email, password } = req.body;

	await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

	try {
		const account = await Account.findOne({ email });

		if (!account) {
			return res.status(400).json({ error: 'Email and password are invalid' });
		}

		account.comparePassword(password, (err, isMatch) => {
			if (err || !isMatch) {
				return res
					.status(400)
					.json({ error: 'Email and password are invalid' });
			}

			return res.status(200).json({
				_id: account._id,
				email: account.email,
				token: 'token',
			});
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}

	return null; // To avoid eslint
};

const register = async (req, res) => {
	const { email, password, username } = req.body;

	if (!email || !password || !username) {
		return res.status(400).json({ error: 'All fields are required' });
	}

	if (!emailValidator(email)) {
		return res.status(400).json({ error: 'Email is invalid' });
	}

	if (!passwordValidator(password)) {
		return res.status(400).json({ error: 'Password is invalid' });
	}

	const exists = await Account.findOne({ email });
	if (exists) {
		return res.status(400).json({ error: 'Email already exists' });
	}

	const account = new Account({
		email,
		password,
		username,
	});

	try {
		await account.save();
		await sendVerificationEmail(account);

		res.header('Location', getUrl(req, account._id));
		return res.status(201).json({ _id: account._id, email: account.email });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

async function sendVerificationEmail(account) {
	try {
		const verificationToken = jwt.sign(
			{ _id: account._id, email: account.email },
			process.env.JWT_SECRET,
			{ expiresIn: `${process.env.JWT_EXPIRATION_DAYS}d` }
		);

		const emailContent = await confirmationEmail(
			account.username,
			verificationToken
		);

		await sendMail({
			from: process.env.MAILER_EMAIL,
			to: account.email,
			subject: 'Validate your email address',
			text: '',
			htmlContent: emailContent,
		});
	} catch (error) {
		console.error('Error sending verification email:', error);
		throw new Error('Failed to send verification email');
	}
}

const verifyAccount = async (req, res) => {
	try {
		const { token } = req.params;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const account = await Account.findById(decoded._id);

		if (!account) {
			return res.status(404).json({ error: 'Account not found' });
		}

		if (account.status !== 'pending') {
			return res
				.status(400)
				.json({ error: 'Account already verified or inactive' });
		}

		account.status = 'active';
		await account.save();

		return res.status(200).json({ message: 'Account verified successfully' });
	} catch (error) {
		if (error.name === 'JsonWebTokenError') {
			return res.status(401).json({ error: 'Invalid token' });
		}
		console.error('Error validating account:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = { login, register, verifyAccount };
