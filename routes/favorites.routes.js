const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Resource = require('../models/Resource.model');
const Subject = require('../models/Subject.model');
const Section = require('../models/Section.model');
const User = require('../models/User.model');


router.post("/favorites", (req, res) => {
    const { idResource, user } = req.body;
    console.log('1111',req.body)
	console.log('2' , idResource)
	console.log('3', user._id)
	
	User.findById( user._id )
		.then((user) => {
			return User.findByIdAndUpdate(user._id, {
				$push: { pendingSubject: idResource}
			});
		})
		.then((response) => res.json(response))
		.catch((err) => res.json(err));
})

module.exports = router;