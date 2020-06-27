const express = require('express');
const router = express.Router();

const db = require('../../data/dbConfig.js');

// Returns All accounts
router.get('/', async (req, res) => {
	try {
		// STRETCH: Add a `query string` option to the `GET /api/accounts` endpoint
		const accounts  = await db('accounts').orderBy('budget', 'desc').limit(7)
		// const accounts  = await db('accounts')
		res.json(accounts)
	} catch (err) {
		next(err)
	}	
})

// Returns an account with the given id
router.get('/:id', async (req, res, next) => {
	try {
		const account = await db('accounts').where('id', req.params.id).limit(1)
		res.json(account)
	} catch (err) {
		next(err)
	}
})

// Creates a new Account
router.post('/', async (req, res, next) => {

	try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget
		}
		const [accountID] = await db('accounts').insert(payload)
		const account = await db.first('*').from('accounts').where('id', accountID)

		res.status(201).json(account)
	} catch (err) {
		next(err)
	}
})

// Update an account with the given id
router.put('/:id', async (req, res, next) => {
	try {
		const payload = {
			name: req.body.name,
			budget: req.body.budget
		}
		await db('accounts').update(payload).where('id', req.params.id)
		const account = await db.first('*').from('accounts').where('id', req.params.id)
		res.json(account)
	} catch (err) {
		next(err)
	}
})

// Deletes an account with the given id
router.delete('/:id', async (req, res, next) => {
	try {
		await db('accounts').where('id', req.params.id).del()
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})

module.exports = router;