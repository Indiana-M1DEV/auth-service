const express = require('express');
const passport = require('passport');
const authenticate = require('../middlewares/authenticate');
const cookieSession = require('cookie-session');
const crypto = require('crypto');

require('dotenv').config();
require('./database').connect();
require('../src/auth_providers/passport');

const app = express();
const port = process.env.AUTH_API_PORT;

const key1 = crypto.randomBytes(32).toString('hex');
const key2 = crypto.randomBytes(32).toString('hex');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cookieSession({
		name: 'user-auth-session',
		keys: [key1, key2],
	})
);

app.use(passport.initialize());
app.use(passport.session());

const routes = [
	{ path: '/auth', router: require('../src/auth_providers/router') },
	{ path: '/account', router: require('../src/account/router') },
];

routes.forEach((route) => {
	if (route.secure) {
		app.use(route.path, authenticate, route.router);
	}

	app.use(route.path, route.router);
});

app.listen(port, () => {
	console.log(`Server is listening on port ${process.env.AUTH_API_PORT}`);
});
