const headerEmail = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Email Header</title>
            <style>
                .header-container {
                    font-family: Arial, sans-serif;
                    background-color: #0A1C2E;
                    color: white;
                    text-align: center;
                    padding: 15px 0;
                }

                .header-content {
                    padding: 0 15px;
                }

                .header-logo {
                    height: 60px;
                }

                .header-container h1 {
                    margin: 10px 0;
                    font-size: 24px;
                }

                .header-container p {
                    font-size: 16px;
                    margin: 5px 0;
                }
            </style>
        </head>
        <body>
            <div class="header-container">
                <div class="header-content">
                    <img src="https://pierre-gineste.fr/assets/images/logohd.png" alt="Indiana Logo" class="header-logo">
                    <h1>Indiana</h1>
                    <p>Your favourite Geocaching App</p>
                </div>
            </div>
        </body>
    </html>
`;

module.exports = {
	headerEmail,
};
