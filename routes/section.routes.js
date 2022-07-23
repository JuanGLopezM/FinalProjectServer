const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Section = require('../models/Section.model');
const Subject = require('../models/Subject.model');

//  POST /api/sections  -  Creates a new section
router.post('/', (req, res, next) => {
    const { title, tags, subjectId } = req.body;

    Section.create({ title, tags, subjectId })
        .then((newSection) => {
            return Subject.findByIdAndUpdate(subjectId, {
                $push: { sections: newSection._id }
            });
        })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

//  GET /api/sections/:sectionId -  Retrieves a specific section by id
router.get('/:sectionsId', (req, res, next) => {
    const { sectionsId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sectionsId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    // Each section document has `resources` array holding `_id`s of resources documents
    // We use .populate() method to get swap the `_id`s for the actual resources documents
    Section.findById(sectionsId)
        .populate('resources')
        .then((section) => res.status(200).json(section))
        .catch((error) => res.json(error));
});

// PUT  /api/subjects/:subjectsId  -  Updates a specific project by id
router.put('/:sectionsId', (req, res, next) => {
    const { sectionsId } = req.params;
    const { inputTitle, inputTags } = req.body
    const updateKeys = {
        title: inputTitle,
        tags: inputTags
    }

    if (!mongoose.Types.ObjectId.isValid(sectionsId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Section.findByIdAndUpdate(sectionsId,
        updateKeys,
        { new: true })
        .then((updatedSection) => res.json(updatedSection))
        .catch((error) => res.json(error));
});

// DELETE  /api/subject/:subjectId  -  Deletes a specific subject by id
router.delete('/:sectionId', (req, res, next) => {
    const { sectionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sectionId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Section.findByIdAndRemove(sectionId)
        .then(() =>
            res.json({
                message: `Section with ${sectionId} is removed successfully.`
            })
        )
        .catch((error) => res.json(error));
});

module.exports = router;