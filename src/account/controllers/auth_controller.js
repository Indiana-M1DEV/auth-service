const Account = require('../models/account_model');
const { emailValidator, passwordValidator } = require('../validators');
const { getUrl } = require('../../../utils/getter');
const { sendMail } = require('../../../utils/sendmail');

const { confirmationEmail } = require('../../../utils/email-templates/validation.js');

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
				token: account.generateJwt(),
			});
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}

	return null; // To avoid eslint
};

const register = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
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
	});

	try {
		await sendMail({
			from: process.env.ACADEMIC_EMAIL,
			to: 'pierregi31.12@gmail.com',
			subject: 'Validate your email address',
			text: 'This is a test email sent from the Express app.',
			html: confirmationEmail(account.email, account.generateJwt()),
		});
		res.send('Test email sent successfully');
	} catch (error) {
		console.error('Error sending email:', error);
		res.status(500).send('An error occurred while sending the email');
	}

	try {
		await account.save();

		res.header('Location', getUrl(req, account._id));
		return res.status(201).json({ _id: account._id, email: account.email });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

module.exports = { login, register };
