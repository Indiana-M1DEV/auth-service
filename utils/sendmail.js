const nodemailer = require('nodemailer');

module.exports = async ({ from, to, subject, text, html }) => {
	let transporter = nodemailer.createTransport({
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
		info = await transporter.sendMail({
			from: `Do Not Reply ${from}`,
			to: to,
			subject: subject,
			text: text,
			html: html,
		});
	} catch (error) {
		console.error('Error in sending email:', error);
		throw error;
	}

	console.log('Message sent: %s', info.messageId);
};
