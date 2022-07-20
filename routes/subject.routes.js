const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Subject = require('../models/Subject.model');

//  POST /api/projects  -  Creates a new project
router.post('/subjects', (req, res, next) => {
	const { title, description, tags, resources } = req.body;

	Subject.create({ title, description, tags, resources })
		.then((response) => res.json(response))
		.catch((err) => res.json(err));
});

//  GET /api/projects -  Retrieves all of the projects
router.get('/subjects', (req, res, next) => {
	Subject.find().then((allSources) => res.json(allSources)).catch((err) => res.json(err));
});

//  GET /api/projects/:projectId -  Retrieves a specific project by id
router.get('/subjects/:subjectsId', (req, res, next) => {
	const { subjectsId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(subjectsId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

// Each Subject document has `resources` array holding `_id`s of Task documents
// We use .populate() method to get swap the `_id`s for the actual Task documents
	Subject.findById(subjectsId)
		
		.then((subject) => res.status(200).json(subject))
		.catch((error) => res.json(error));
});

// PUT  /api/projects/:projectId  -  Updates a specific project by id
// router.put('/projects/:projectId', (req, res, next) => {
// 	const { projectId } = req.params;

// 	if (!mongoose.Types.ObjectId.isValid(projectId)) {
// 		res.status(400).json({ message: 'Specified id is not valid' });
// 		return;
// 	}

// 	Project.findByIdAndUpdate(projectId, req.body, { new: true })
// 		.then((updatedProject) => res.json(updatedProject))
// 		.catch((error) => res.json(error));
// });

// DELETE  /api/subject/:subjectId  -  Deletes a specific subject by id
router.delete('/subjects/:subjectId', (req, res, next) => {
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
