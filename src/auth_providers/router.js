const express = require('express');
const router = express.Router();

const {
	login,
	register,
	verifyAccount,
} = require('./controllers/auth_controller');
const {
	googleAuth,
	googleAuthCallback,
	authFailure,
} = require('./controllers/google_auth_controller');

const authenticate = require('../middlewares/authenticate');

/* Local Auth */

router.post('/login', login);

router.post('/register', register);

router.get('/verify', authenticate, (req, res) => {
	res.status(200).json({ id: req._id, email: req.email });
});

router.get('/validate/:token', verifyAccount);

/* Google Auth */

router.get('/google', googleAuth);

router.get('/google/callback', googleAuth, googleAuthCallback);

router.get('/google/failure', authFailure);

module.exports = router;
