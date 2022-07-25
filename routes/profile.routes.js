const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Resource = require('../models/Resource.model');
const Subject = require('../models/Subject.model');
const Section = require('../models/Section.model');
const User = require('../models/User.model');

//  GET /api/profile -  Retrieves all profile of the user
router.get('/profile', (req, res, next) => {
	console.log('PAYLOAD',req.payload._id)

	User.findById(req.payload._id)
	.populate('pending')
	.then((allPending) => res.json(allPending))
	.catch((err) => res.json(err));
});

router.post("/profile", (req, res) => {
    const { idResource, user } = req.body;
	
	User.findById( user._id )
		.then((user) => {
			return User.findByIdAndUpdate(user._id, {
				$push: { pending: idResource}
			});
		})
		.then((response) => res.json(response))
		.catch((err) => res.json(err));
})

module.exports = router;