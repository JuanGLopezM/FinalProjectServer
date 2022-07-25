const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Resource = require('../models/Resource.model');
const Subject = require('../models/Subject.model');
const Section = require('../models/Section.model');
const User = require('../models/User.model');

//  GET /api/profile -  Retrieves all profile of the user
router.get('/', (req, res, next) => {
	console.log('PAYLOAD',req.payload._id)

	User.findById(req.payload._id)
	.populate('pending')
	.then((allPending) => res.json(allPending))
	.catch((err) => res.json(err));
});

router.post("/", (req, res) => {
    const { idResource, user } = req.body;
	console.log("req.body", req.body)
	
	User.findById( user._id )
		.then((user) => {
			if(!user.pending.includes(idResource)) {
			return User.findByIdAndUpdate(user._id, { $push: { pending: idResource} });
			}})
		.catch((err) => res.json(err));
})

module.exports = router;