const Account = require('../model/account_model');

const getUserProfile = async (req, res) => {
	const { userId } = req.params;

	try {
		const account = await Account.findById(userId);
		if (!account) return res.status(404).json({ error: 'Account not found' });

		return res.status(200).json({
			username: account.username,
			email: account.email,
			createdAt: account.createdAt,
		});
	} catch (err) {
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const getUserStats = async (req, res) => {
	const { userId } = req.params;

	try {
		const account = await Account.findById(userId);
		if (!account) return res.status(404).json({ error: 'Account not found' });

		return res.status(200).json({
			username: account.username,
			cacheFound: account.cacheFound,
			cacheOrganised: account.cacheOrganised,
			collectedNFTs: account.collectedNFTs.length,
			accountCreatedAt: account.createdAt,
		});
	} catch (err) {
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const getUserNFTs = async (req, res) => {
	const { userId } = req.params;

	try {
		const account = await Account.findById(userId);
		if (!account) return res.status(404).json({ error: 'Account not found' });

		return res.status(200).json(account.collectedNFTs);
	} catch (err) {
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const updateCacheFound = async (req, res) => {
	const { userId } = req.params;

	try {
		const account = await Account.findById(userId);
		if (!account) return res.status(404).json({ error: 'Account not found' });

		account.cacheFound += 1;
		await account.save();

		return res.status(200).json(account.cacheFound);
	} catch (err) {
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const updateCacheOrganised = async (req, res) => {
	const { userId } = req.params;

	try {
		const account = await Account.findById(userId);
		if (!account) return res.status(404).json({ error: 'Account not found' });

		account.cacheOrganised += 1;
		await account.save();

		return res.status(200).json(account.cacheOrganised);
	} catch (err) {
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const updateCollectedNFTs = async (req, res) => {
	const { userId, nftId } = req.params;

	try {
		const account = await Account.findById(userId);
		if (!account) return res.status(404).json({ error: 'Account not found' });

		if (account.collectedNFTs.includes(nftId))
			return res.status(400).json({ error: 'NFT already collected' });

		account.collectedNFTs.push(nftId);
		await account.save();

		return res.status(200).json(account.collectedNFTs);
	} catch (err) {
		return res.status(500).json({ error: 'Internal server error' });
	}
};

const deleteAccount = async (req, res) => {
	const { email } = req.body;

	try {
		const account = await Account.findOneAndDelete({ email });
		if (!account) {
			return res.status(404).json({ error: 'Account not found' });
		}

		return res.status(204).end();
	} catch (err) {
		return res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = {
	getUserProfile,
	getUserStats,
	getUserNFTs,
	updateCacheFound,
	updateCacheOrganised,
	updateCollectedNFTs,
	deleteAccount,
};
