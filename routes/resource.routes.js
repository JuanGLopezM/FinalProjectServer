const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Resource = require('../models/Resource.model');
const Subject = require('../models/Subject.model');
const Section = require('../models/Section.model');

//  POST /api/resources  -  Creates a new resource
router.post('/resources', (req, res, next) => {
	const { tags,subject, source, id, sectionId } = req.body;
	console.log(req.body)

	Resource.create({ tags, subject, source, id, sectionId })
		.then((newResource) => {
			console.log('NEWSOURCE:', newResource)
			return Section.findByIdAndUpdate(sectionId, {
				$push: { resources: newResource._id}
			});
		})
		.then((response) => res.json(response))
		.catch((err) => res.json(err));
});


// LLC > Pendiente actualizar task por resource y project por subject

// PUT  /api/tasks/:taskId  - Updates a specific task by id
// router.put('/tasks/:taskId', (req, res, next) => {
// 	const { taskId } = req.params;
// 	const { inputTitle, inputDescription } = req.body;
// 	const title = inputTitle;
// 	const description = inputDescription;
	

// 	if (!mongoose.Types.ObjectId.isValid(taskId)) {
// 		res.status(400).json({ message: 'Specified id is not valid' });
// 		return;
// 	}

// 	Task.findByIdAndUpdate(
// 		taskId,
// 		{ title, description },
// 		{ new: true }
// 	)
// 		.then(() => {
// 			res.send(req.body);
// 		})
// 		.catch((err) => res.json(err));
// });

//  DELETE /api/tasks/:taskId  - Deletes a specific task by id
// router.delete('/tasks/:taskId', (req, res, next) => {
// 	const { taskId } = req.params;

// 	if (!mongoose.Types.ObjectId.isValid(taskId)) {
// 		res.status(400).json({ message: 'Specified id is not valid' });
// 		return;
// 	}

// 	Task.findByIdAndRemove(taskId)
// 		.then(() => res.json({ message: `Task with ${taskId} is removed successfully.` }))
// 		.catch((error) => res.json(error));
// });

module.exports = router;
