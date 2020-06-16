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

// Creates a new Account
router.post('/', (req, res) => {

	// If the following fields are not completed then no account will be created
	if (!req.body.name || !req.body.budget) {
		return res.status(400).json({
			errorMessage: 'Please provide name and budget for the account.'
		})
	}

	db('accounts').insert(req.body)
		.then((account) => {
			console.log(account)
			res.status(200).json({
				message: 'The account was successfully added.'
			})
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				errorMessage: 'There was an error in posting the account.'
			})
		})
})

// Update an account with the given id
router.put('/:id', (req, res) => {
  
	// If the following fields are not completed then the account can't be updated
	if (!req.body.name || !req.body.budget) {
		return res.status(400).json({
			errorMessage: 'Please provide name and budget for the account.'
		})
	}

    const { id } = req.params;
  
	db('accounts').where({ id }).update(req.body)
	.then((count) => {
      if (count) {
        res.json({ 
			message: `The account was updated successfully.` 
		})
      } else {
        res.status(404).json({ 
			message: 'The account with the specified id does not exist.' 
		})
    }})
    .catch((error) => {
		console.log(error)
		res.status(500).json({ 
			errorMessage: 'The account could not be updated.' 
		})
    })
})


module.exports = router;