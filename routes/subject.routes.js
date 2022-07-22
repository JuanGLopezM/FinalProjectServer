const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Subject = require('../models/Subject.model');

//  POST /api/projects  -  Creates a new project
router.post('/', (req, res, next) => {
	const { title, description, tags, sections } = req.body;

	Subject.create({ title, description, tags, sections })
		.then((response) => res.json(response))

		.catch((err) => res.json(err));
});

//  GET /api/projects -  Retrieves all of the projects
router.get('/', (req, res, next) => {
	Subject.find().then((allSources) => res.json(allSources)).catch((err) => res.json(err));

});

//  GET /api/projects/:projectId -  Retrieves a specific project by id
router.get('/:subjectsId', (req, res, next) => {
	const { subjectsId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(subjectsId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	// Each Subject document has `sections` array holding `_id`s of resources documents
	// We use .populate() method to get swap the `_id`s for the actual sections documents
	Subject.findById(subjectsId)
		.populate('sections')
		.then((subject) => {
			console.log(subject)
			res.status(200).json(subject)
		})
		.catch((error) => res.json(error));
});

// PUT  /api/subjects/:subjectsId  -  Updates a specific project by id
router.put('/:subjectsId', (req, res, next) => {
	const { subjectsId } = req.params;
	console.log("subjectsId:", subjectsId)
	console.log("req.body:", req.body)
	const { inputTitle, inputDescription, inputTags } = req.body
	const updateKeys = {
		title: inputTitle,
		description: inputDescription,
		tags: inputTags
	}

	if (!mongoose.Types.ObjectId.isValid(subjectsId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Subject.findByIdAndUpdate(subjectsId,
		updateKeys,
		{ new: true })
		.then((updatedSubject) => res.json(updatedSubject))
		.catch((error) => res.json(error));
});

// DELETE  /api/subject/:subjectId  -  Deletes a specific subject by id
router.delete('/:subjectId', (req, res, next) => {
	const { subjectId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(subjectId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Subject.findByIdAndRemove(subjectId)
		.then(() =>
			res.json({
				message: `Subject with ${subjectId} is removed successfully.`
			})
		)
		.catch((error) => res.json(error));
});

module.exports = router;
