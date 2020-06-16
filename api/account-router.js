const express = require('express');
const router = express.Router();

const db = require('../data/dbConfig.js');

// Returns All accounts
router.get('/', (req, res) => {
	db('accounts')
		.then((accounts) => {
			res.status(200).json(accounts)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'The account information could not be retrieved.'
			})
		})
})

// Returns an account with the given id
router.get('/:id', (req, res) => {

	const { id } = req.params;

	db('accounts').where({ id })
		.then((account) => {
			if (account) {
				res.status(200).json(account)
			} else {
				res.status(404).json({
					message: 'The account with the specified id does not exist.'
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'The account information could not be retrieved.'
			})
		})
})



module.exports = router;