const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Resource = require('../models/Resource.model');
const Subject = require('../models/Subject.model');
const Section = require('../models/Section.model');
const User = require('../models/User.model');


router.post("/favorites", (req, res) => {
    const { resourceId } = req.body;
    console.log('llegamos?')
	console.log(req);
	
	User.findById({ resourceId })
		.then((newFavorite) => {
			return User.findByIdAndUpdate(userId, {
				$push: { pendingSubject: newFavorite._id}
			});
		})
		.then((response) => res.json(response))
		.catch((err) => res.json(err));
})

module.exports = router;