const nodemailer = require('nodemailer');
const header = require('./email-templates/layout/header');
const footer = require('./email-templates/layout/footer');

const sendMail = async ({
	from = process.env.MAILER_EMAIL,
	to,
	subject,
	text,
	htmlContent,
}) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: process.env.SMTP_PORT,
		secure: false,
		auth: {
			user: process.env.MAILER_EMAIL,
			pass: process.env.MAILER_PASSWORD,
		},
	});

	const html = `${header.headerEmail}${'</br>'}${htmlContent}${'</br>'}${footer.footerEmail}`;
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

module.exports = sendMail;
