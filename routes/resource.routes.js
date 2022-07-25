const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Resource = require('../models/Resource.model');
const Subject = require('../models/Subject.model');
const Section = require('../models/Section.model');

//  POST /api/resources  -  Creates a new resource
router.post('/resources', (req, res, next) => {
	const { title,tags, source, sectionId } = req.body;
	
	Resource.create({ title, tags, source, sectionId })
		.then((newResource) => {
			return Section.findByIdAndUpdate(sectionId, {
				$push: { resources: newResource._id}
			});
		})
		.then((response) => res.json(response))
		.catch((err) => res.json(err));
});

// PUT  /api/tasks/:taskId  - Updates a specific task by id
router.put('/resources/:resourceId', (req, res, next) => {
	const { resourceId } = req.params;
	const { inputTitle, inputTags, inputSource } = req.body;
	const title = inputTitle;
	const tags = inputTags;
	const source = inputSource;
	
	if (!mongoose.Types.ObjectId.isValid(resourceId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Resource.findByIdAndUpdate(
		resourceId,
		{ title, tags, source },
		{ new: true }
	)
		.then(() => {
			res.send(req.body);
		})
		.catch((err) => res.json(err));
});

//  DELETE /api/tasks/:taskId  - Deletes a specific task by id
router.delete('/resources/:resourceId', (req, res, next) => {
	const { resourceId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(resourceId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Resource.findByIdAndRemove(resourceId)
		.then(() => res.json({ message: `Resource with ${resourceId} is removed successfully.` }))
		.catch((error) => res.json(error));
});

module.exports = router;
