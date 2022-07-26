const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Resource = require('../models/Resource.model');
const Subject = require('../models/Subject.model');
const Section = require('../models/Section.model');
const User = require('../models/User.model');

//  GET /api/profile -  Retrieves all profile of the user
router.get('/', (req, res, next) => {

	User.findById(req.payload._id)
	.populate('pending')
	.populate('pendingExternal')
	.then((allPending) => {
	console.log(allPending)
	res.json(allPending)})
	.catch((err) => res.json(err));
});

//Add a resource to the profile
router.post("/", (req, res) => {
    const { idResource, user } = req.body;
	
	User.findById( user._id )
		.then((user) => {
			if(!user.pending.includes(idResource)) {
			return User.findByIdAndUpdate(user._id, { $push: { pending: idResource} });
			}})
		.catch((err) => res.json(err));
})

//delete a resource from the profile
router.delete("/:id", (req, res) => {
    const { id } = req.params
    console.log(id)
    console.log('userpayload:', req.payload._id)
   
	User.findByIdAndUpdate(req.payload._id, { $pull: { pending: id } })
        .then(() => { res.status(200).json({})} )
        .catch(err => console.log(err));

})

module.exports = router;