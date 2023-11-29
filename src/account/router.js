const express = require('express');
const router = express.Router();

const authenticate = require('../../middlewares/authenticate');

const {
	login,
	register,
	verifyAccount,
} = require('./controllers/auth_controller');
const { deleteAccount } = require('./controllers/account_controller');

router.post('/login', login);

router.post('/register', register);

router.get('/verify', authenticate, (req, res) => {
	res.status(200).json({ id: req._id, email: req.email });
});

router.get('/validate/:token', verifyAccount);

router.delete('/delete', deleteAccount);

module.exports = router;
