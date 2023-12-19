const footerEmail = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Email Signature</title>
    <style>
    .signature-container {
        font-family: Arial, sans-serif;
        color: #333;
        line-height: 1.4;
        font-size: 12px;
    }
    .signature-details {
        padding: 15px;
        text-align: center;
    }
    .signature-details p {
        text-align: center;
        margin: 4px 0;
    }
    .signature-contact a {
        color: #000;
        text-decoration: none;
    }
    .signature-contact img {
        height: 16px; /* Adjust the size as needed */
        margin-right: 8px;
    }
    .signature-disclaimer {
        background-color: #0A1C2E;
        padding: 10px;
        margin-top: 15px;
        color: #fff;
    }
    </style>
    </head>
    <body>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center">
                <div class="signature-container">
                    <div class="signature-details">
                        <div class="signature-contact">
                            <img src="https://pierre-gineste.fr/assets/images/mail.png" alt="Email" width="16" height="16">
                            <a href="mailto:pierre.gineste@supdevinci-edu.fr">pierre.gineste@supdevinci-edu.fr</a>
                        </div>
                        <div class="signature-contact">
                            <img src="https://pierre-gineste.fr/assets/images/link.png" alt="Website" width="16" height="16">
                            <a href="www.donotclick.com" target="_blank">www.donotclick.com</a>
                        </div>
                        <div class="signature-contact">
                            <img src="https://pierre-gineste.fr/assets/images/phone.png" alt="Phone" width="16" height="16">
                            <a href="tel:+33000000000">+33DONOTCALL</a>
                        </div>
                    <!-- Add social media icons as needed -->
                    </div>
                    <div class="signature-disclaimer">
                    <p>This email and its attachments are intended only for the named recipient(s) and may contain confidential information. Unauthorized dissemination, distribution, copying, or any other use of this message or its attachments is prohibited. Attachments may contain software viruses that could harm your computer. Indiana has endeavored to reduce this risk but cannot be held liable for any damages caused by viruses. We advise conducting your own virus checks before opening any attachments. The information in this email is based on publicly available sources. While we strive for accuracy, Indiana is not responsible for any errors, omissions, or losses resulting from the use of this information.</p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
    </body>
    </html>
`;

module.exports = {
	footerEmail,
};
