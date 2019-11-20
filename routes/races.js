var express = require('express');
var router = express.Router();
var Race = require('../models/race');
var AbilityScoreIncrease = require('../models/ability_score_increase');
var deepPopulate = require('mongoose-deep-populate');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all races:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Race.find(req.query) 
        .sort({name: 'asc'})
        .populate('subraces')
        .populate('ability_score_increase')
        .deepPopulate('subraces.ability_score_increase')
        .exec(function(err, races) {
            if(err) return next(err);
            res.json(races);
    });
})

//POST a newly created race:
.post(function(req, res, next) {
    Race.create(req.body, function(err, race) {
        if(err) return next(err);
        console.log("New race created");
        res.json(race);
    });
})

//DELETE all races:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Race.find(req.query)
        .exec(function(err, races) {
            if(err) return next(err);
            console.log("Removing all races from the system.");
            console.log(races.length + " races were found and are pending delete");
            for(var i = races.length - 1; i >= 0; i--) {
                races[i].remove();
            }
            res.json("Successfully removed " + races.length + " races");
    })
});

//########################################
router.route('/:raceId')

///GET race by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Race.findById(req.params.raceId) 
        .populate('subraces')
        .populate('ability_score_increase')
        .deepPopulate('subraces.ability_score_increase')
        .exec(function(err, race) {
            if(err) throw err;
            res.json(race);
    });
})

//PUT update race by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Race.findByIdAndUpdate(req.params.raceId, {$set: req.body}, {new: true}) 
        .exec(function(err, race) {
            if(err) throw err;
            res.json(race);
    });
})

///DELETE race by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Race.findById(req.params.raceId)
        .exec(function(err, race) {
            if(err) throw err;
            race.remove();
            res.json("Successfully removed " + race.name);
    });
});

module.exports = router;