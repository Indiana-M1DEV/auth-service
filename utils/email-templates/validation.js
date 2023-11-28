async function confirmationEmail(name, token) {
	return `
    <html>
      <body>
        <p>Hi ${name},</p>
        <p>Thanks for registering!</p>
        <p>Please click the link below to validate your account.</p>
        <a href="http://localhost:3000/validate/${token}">Validate</a>
      </body>
    </html>
  `;
}

module.exports = {
	confirmationEmail,
};
