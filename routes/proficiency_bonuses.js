var express = require('express');
var router = express.Router();
var ProficiencyBonus = require('../models/proficiency_bonus');
var Verify = require('./verify');

//###########################
router.route('/')

//GET all proficiency_bonuses:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    ProficiencyBonus.find(req.query) 
        .sort({spellcasting_class: 'asc', level: 'asc', name: 'asc'})
        .exec(function(err, proficiency_bonuses) {
            if(err) return next(err);
            res.json(proficiency_bonuses);
    });
})

//POST a newly created proficiency_bonus:
.post(function(req, res, next) {
    ProficiencyBonus.create(req.body, function(err, proficiency_bonus) {
        if(err) return next(err);
        console.log("New proficiency_bonus created");
        res.json(proficiency_bonus);
    });
})

//DELETE all proficiency_bonuses:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    ProficiencyBonus.find(req.query)
        .exec(function(err, proficiency_bonuses) {
            if(err) return next(err);
            console.log("Removing all proficiency_bonuses from the system.");
            console.log(proficiency_bonuses.length + " proficiency_bonuses were found and are pending delete");
            for(var i = proficiency_bonuses.length - 1; i >= 0; i--) {
                proficiency_bonuses[i].remove();
            }
            res.json("Successfully removed " + proficiency_bonuses.length + " proficiency_bonuses");
    })
});

//########################################
router.route('/:proficiency_bonusId')

///GET proficiency_bonus by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    ProficiencyBonus.findById(req.params.proficiency_bonusId)
        .exec(function(err, proficiency_bonus) {
            if(err) throw err;
            res.json(proficiency_bonus);
    });
})

//PUT update proficiency_bonus by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    ProficiencyBonus.findByIdAndUpdate(req.params.proficiency_bonusId, {$set: req.body}, {new: true}) 
        .exec(function(err, proficiency_bonus) {
            if(err) throw err;
            res.json(proficiency_bonus);
    });
})

///DELETE proficiency_bonus by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    ProficiencyBonus.findById(req.params.proficiency_bonusId)
        .exec(function(err, proficiency_bonus) {
            if(err) throw err;
            proficiency_bonus.remove();
            res.json("Successfully removed " + proficiency_bonus.name);
    });
});

module.exports = router;