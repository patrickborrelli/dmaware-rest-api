var express = require('express');
var router = express.Router();
var Skill = require('../models/skill');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all skills:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Skill.find(req.query) 
        .sort({name: 'asc'})
        .exec(function(err, skills) {
            if(err) return next(err);
            res.json(skills);
    });
})

//POST a newly created skill:
.post(function(req, res, next) {
    Skill.create(req.body, function(err, skill) {
        if(err) return next(err);
        console.log("New skill created");
        res.json(skill);
    });
})

//DELETE all skills:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Skill.find(req.query)
        .exec(function(err, skills) {
            if(err) return next(err);
            console.log("Removing all skills from the system.");
            console.log(skills.length + " skills were found and are pending delete");
            for(var i = skills.length - 1; i >= 0; i--) {
                skills[i].remove();
            }
            res.json("Successfully removed " + skills.length + " skills");
    })
});

//########################################
router.route('/:skillId')

///GET skill by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Skill.findById(req.params.skillId)
        .exec(function(err, skill) {
            if(err) throw err;
            res.json(skill);
    });
})

//PUT update skill by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Skill.findByIdAndUpdate(req.params.skillId, {$set: req.body}, {new: true}) 
        .exec(function(err, skill) {
            if(err) throw err;
            res.json(skill);
    });
})

///DELETE skill by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Skill.findById(req.params.skillId)
        .exec(function(err, skill) {
            if(err) throw err;
            skill.remove();
            res.json("Successfully removed " + skill.name);
    });
});

module.exports = router;