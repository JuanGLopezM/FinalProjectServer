const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Resource = require('../models/Resource.model');
const Subject = require('../models/Subject.model');
const Section = require('../models/Section.model');


router.post("/add-favorite", isLoggedIn, (req, res) => {
   
    // console.log(req.body)

    Games.find({ id: idToCheck })
        .then(charArray => {
            // comprobar si ese apiId ya esta en db games
            console.log(charArray)
            if (charArray.length === 0) {
                Games
                    .create(query)
                    .then(result => {
                        console.log(result)
                        User
                            .findByIdAndUpdate(req.user._id, { $push: { favorites: result._id } })
                            .then(() => {
                                res.redirect("/games")
                            })
                    })
                    .catch(err => console.log(err))
            } else {
                User
                    .findById(req.user._id)
                    .then((user) => {
                        if (!user.favorites.includes(charArray[0]._id)) {
                            User
                                .findByIdAndUpdate(req.user._id, { $push: { favorites: charArray[0]._id } })
                                .then(() => {
                                    res.redirect("/games")
                                })
                        } else { res.redirect("/games") }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
})