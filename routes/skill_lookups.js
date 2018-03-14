var express = require('express');
var router = express.Router();
var SkillLookup = require('../models/skill_lookup');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all skill lookups:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    SkillLookup.find(req.query) 
        .sort({name: 'asc'})
        .exec(function(err, skill_lookups) {
            if(err) return next(err);
            res.json(skill_lookups);
    });
})

//POST a newly created skill_lookup:
.post(function(req, res, next) {
    SkillLookup.create(req.body, function(err, skill_lookup) {
        if(err) return next(err);
        console.log("New skill lookupcreated");
        res.json(skill_lookup);
    });
})

//DELETE all skill lookups:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    SkillLookup.find(req.query)
        .exec(function(err, skill_lookups) {
            if(err) return next(err);
            console.log("Removing all skill lookups from the system.");
            console.log(skill_lookups.length + " skill lookups were found and are pending delete");
            for(var i = skill_lookups.length - 1; i >= 0; i--) {
                skill_lookups[i].remove();
            }
            res.json("Successfully removed " + skill_lookups.length + " skill lookups");
    })
});

//########################################
router.route('/:skill_lookupId')

///GET skill_lookup by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    SkillLookup.findById(req.params.skill_lookupId)
        .exec(function(err, skill_lookup) {
            if(err) throw err;
            res.json(skill_lookup);
    });
})

//PUT update skill lookupby ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    SkillLookup.findByIdAndUpdate(req.params.skill_lookupId, {$set: req.body}, {new: true}) 
        .exec(function(err, skill_lookup) {
            if(err) throw err;
            res.json(skill_lookup);
    });
})

///DELETE skill lookupby ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    SkillLookup.findById(req.params.skill_lookupId)
        .exec(function(err, skill_lookup) {
            if(err) throw err;
            skill_lookup.remove();
            res.json("Successfully removed " + skill_lookup.name);
    });
});

module.exports = router;