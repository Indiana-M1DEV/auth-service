const express = require('express');
const passport = require('passport');
const authenticate = require('./middlewares/authenticate');
const session = require('express-session');

require('dotenv').config();
require('./database').connect();
require('../src/auth_providers/passport');

const app = express();
const port = process.env.AUTH_API_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const routes = [
	{ path: '/auth', router: require('../src/auth_providers/router') },
	{ path: '/account', router: require('../src/account/router') },
];

routes.forEach((route) => {
	if (route.secure) app.use(route.path, authenticate, route.router);

	app.use(route.path, route.router);
});

app.listen(port, () => {
	console.log(`Server is listening on port ${process.env.AUTH_API_PORT}`);
});
