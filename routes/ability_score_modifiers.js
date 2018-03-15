var express = require('express');
var router = express.Router();
var AbilityScoreModifier = require('../models/ability_score_modifier');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all ability_score_modifiers:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    AbilityScoreModifier.find(req.query) 
        .sort({name: 'asc'})
        .exec(function(err, ability_score_modifiers) {
            if(err) return next(err);
            res.json(ability_score_modifiers);
    });
})

//POST a newly created ability_score_modifier:
.post(function(req, res, next) {
    AbilityScoreModifier.create(req.body, function(err, ability_score_modifier) {
        if(err) return next(err);
        console.log("New ability_score_modifier created");
        res.json(ability_score_modifier);
    });
})

//DELETE all ability_score_modifiers:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    AbilityScoreModifier.find(req.query)
        .exec(function(err, ability_score_modifiers) {
            if(err) return next(err);
            console.log("Removing all ability_score_modifiers from the system.");
            console.log(ability_score_modifiers.length + " ability_score_modifiers were found and are pending delete");
            for(var i = ability_score_modifiers.length - 1; i >= 0; i--) {
                ability_score_modifiers[i].remove();
            }
            res.json("Successfully removed " + ability_score_modifiers.length + " ability_score_modifiers");
    })
});

//########################################
router.route('/:ability_score_modifierId')

///GET ability_score_modifier by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    AbilityScoreModifier.findById(req.params.ability_score_modifierId)
        .exec(function(err, ability_score_modifier) {
            if(err) throw err;
            res.json(ability_score_modifier);
    });
})

//PUT update ability score modifier by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    AbilityScoreModifier.findByIdAndUpdate(req.params.ability_score_modifierId, {$set: req.body}, {new: true}) 
        .exec(function(err, ability_score_modifier) {
            if(err) throw err;
            res.json(ability_score_modifier);
    });
})

///DELETE ability score modifier by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    AbilityScoreModifier.findById(req.params.ability_score_modifierId)
        .exec(function(err, ability_score_modifier) {
            if(err) throw err;
            ability_score_modifier.remove();
            res.json("Successfully removed " + ability_score_modifier.name);
    });
});

module.exports = router;