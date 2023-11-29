async function confirmationEmail(name, token) {
	let baseUrl;

	if (process.env.NODE_ENV === 'production')
		baseUrl = `http://${process.env.AUTH_API_HOST}`;
	else
		baseUrl = `http://${process.env.AUTH_API_HOST}:${process.env.AUTH_API_PORT}`;

	return `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    color: #333;
                    line-height: 1.4;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin: 20px 0;
                    background-color: #0A1C2E;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                }
                .button:hover {
                    background-color: #007BFF;
                }
            </style>
        </head>
        <body>
            <table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td align="center" valign="middle">
                        <table>
                            <tr>
                                <td align="center">
                                    <p>Hi ${name},</p>
                                    <p>Thanks for registering!</p>
                                    <p>Please click the button below to validate your account.</p>
                                    <a href="${baseUrl}/validate/${token}" class="button">Validate</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>
  `;
}

module.exports = {
	confirmationEmail,
};
