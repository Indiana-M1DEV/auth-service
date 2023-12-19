const express = require('express');
const router = express.Router();

const { deleteAccount } = require('./controllers/account_controller');

router.delete('/delete', deleteAccount);

module.exports = router;
