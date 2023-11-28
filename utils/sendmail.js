const nodemailer = require('nodemailer');

module.exports = async ({ from, to, subject, text, html }) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: process.env.SMTP_PORT,
		secure: false,
		auth: {
			user: process.env.ACADEMIC_EMAIL,
			pass: process.env.ACADEMIC_EMAIL_PASSWORD,
		},
	});

	// Send mail with defined transport object
	try {
		const info = await transporter.sendMail({
			from: `Do Not Reply ${from}`,
			to,
			subject,
			text,
			html,
		});

		console.log('Message sent: %s', info.messageId);
	} catch (error) {
		console.error('Error in sending email:', error);
		throw error;
	}
};
