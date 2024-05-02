const express = require('express');
const router = express.Router();

const {
	getUserProfile,
	getUserStats,
	getUserNFTs,
	updateCacheFound,
	updateCacheOrganised,
	updateCollectedNFTs,
	deleteAccount,
} = require('./controllers/account_controller');

router.get('/profile/:userId', getUserProfile);

router.get('/stats/:userId', getUserStats);

router.get('/nfts/:userId', getUserNFTs);

router.put('/addCache/:userId', updateCacheFound);

router.put('/organiseCache/:userId', updateCacheOrganised);

router.put('/addNFT/:userId/:nftId', updateCollectedNFTs);

router.delete('/delete', deleteAccount);

module.exports = router;
