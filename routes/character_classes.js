var express = require('express');
var router = express.Router();
var CharacterClass = require('../models/character_class');
var ProficiencyBonus = require('../models/proficiency_bonus');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all character classes:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    CharacterClass.find(req.query) 
        .sort({name: 'asc'})
        .populate('proficiency_bonus')
        .exec(function(err, character_classes) {
            if(err) return next(err);
            res.json(character_classes);
    });
})

//POST a newly created character class:
.post(function(req, res, next) {
    CharacterClass.create(req.body, function(err, charclass) {
        if(err) return next(err);
        console.log("New character class created");
        res.json(charclass);
    });
})

//DELETE all character classes:
.delete(Verify.verifyAdmin, function(req, res, next) {
    CharacterClass.find(req.query)
        .exec(function(err, character_classes) {
            if(err) return next(err);
            console.log("Removing all character classes from the system.");
            console.log(character_classes.length + " character classes were found and are pending delete");
            for(var i = character_classes.length - 1; i >= 0; i--) {
                character_classes[i].remove();
            }
            res.json("Successfully removed " + character_classes.length + " character classes");
    })
});

//########################################
router.route('/:classId')

///GET character class by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    CharacterClass.findById(req.params.classId)
        .populate('proficiency_bonus')
        .exec(function(err, charclass) {
            if(err) throw err;
            res.json(charclass);
    });
})

//PUT update club by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    CharacterClass.findByIdAndUpdate(req.params.classId, {$set: req.body}, {new: true}) 
        .exec(function(err, charclass) {
            if(err) throw err;
            res.json(charclass);
    });
})

///DELETE club by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    CharacterClass.findById(req.params.classId)
        .exec(function(err, charclass) {
            if(err) throw err;
            charclass.remove();
            res.json("Successfully removed " + charclass.name);
    });
});

module.exports = router;