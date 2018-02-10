var express = require('express');
var router = express.Router();
var AbilityScoreIncrease = require('../models/ability_score_increase');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all ability_score_increases:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    AbilityScoreIncrease.find(req.query) 
        .sort({name: 'asc'})
        .exec(function(err, ability_score_increases) {
            if(err) return next(err);
            res.json(ability_score_increases);
    });
})

//POST a newly created ability_score_increase:
.post(function(req, res, next) {
    AbilityScoreIncrease.create(req.body, function(err, ability_score_increase) {
        if(err) return next(err);
        console.log("New ability_score_increase created");
        res.json(ability_score_increase);
    });
})

//DELETE all ability_score_increases:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    AbilityScoreIncrease.find(req.query)
        .exec(function(err, ability_score_increases) {
            if(err) return next(err);
            console.log("Removing all ability_score_increases from the system.");
            console.log(ability_score_increases.length + " ability_score_increases were found and are pending delete");
            for(var i = ability_score_increases.length - 1; i >= 0; i--) {
                ability_score_increases[i].remove();
            }
            res.json("Successfully removed " + ability_score_increases.length + " ability_score_increases");
    })
});

//########################################
router.route('/:ability_score_increaseId')

///GET ability_score_increase by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    AbilityScoreIncrease.findById(req.params.ability_score_increaseId)
        .exec(function(err, ability_score_increase) {
            if(err) throw err;
            res.json(ability_score_increase);
    });
})

//PUT update ability score increase by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    AbilityScoreIncrease.findByIdAndUpdate(req.params.ability_score_increaseId, {$set: req.body}, {new: true}) 
        .exec(function(err, ability_score_increase) {
            if(err) throw err;
            res.json(ability_score_increase);
    });
})

///DELETE ability score increase by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    AbilityScoreIncrease.findById(req.params.ability_score_increaseId)
        .exec(function(err, ability_score_increase) {
            if(err) throw err;
            ability_score_increase.remove();
            res.json("Successfully removed " + ability_score_increase.name);
    });
});

module.exports = router;