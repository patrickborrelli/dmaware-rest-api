var express = require('express');
var router = express.Router();
var Character = require('../models/character');
var deepPopulate = require('mongoose-deep-populate');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all characters:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Character.find(req.query) 
        .deepPopulate('character_class character_class.primary_weapon character_class.secondary_weapon character_class.tertiary_weapon character_class.armor character_class.mandatory_equipment race race.subraces race.ability_score_increase race.subraces.ability_score_increase inventory inventory.items')
        .populate('skills')
        .populate('attacks')
        .populate('spellbook')    
        .populate('user')
        .exec(function(err, characters) {
            if(err) return next(err);
            res.json(characters);
    });
})

//POST a newly created character:
.post(function(req, res, next) {
    Character.create(req.body, function(err, character) {
        if(err) return next(err);
        console.log("New character created");
        res.json(character);
    });
})

//DELETE all characters:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Character.find(req.query)
        .exec(function(err, characters) {
            if(err) return next(err);
            console.log("Removing all characters from the system.");
            console.log(characters.length + " characters were found and are pending delete");
            for(var i = characters.length - 1; i >= 0; i--) {
                characters[i].remove();
            }
            res.json("Successfully removed " + characters.length + " characters");
    })
});

//########################################
router.route('/:characterId')

///GET character by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Character.findById(req.params.characterId)        
        .deepPopulate('character_class character_class.primary_weapon character_class.secondary_weapon character_class.tertiary_weapon character_class.armor character_class.mandatory_equipment race race.subraces race.ability_score_increase race.subrace.ability_score_increase inventory inventory.items')
        .populate('skills')
        .populate('attacks')
        .populate('spellbook')  
        .populate('user')
        .exec(function(err, character) {
            if(err) throw err;
            res.json(character);
    });
})

//PUT update character by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Character.findByIdAndUpdate(req.params.characterId, {$set: req.body}, {new: true}) 
        .exec(function(err, character) {
            if(err) throw err;
            res.json(character);
    });
})

///DELETE character by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Character.findById(req.params.characterId)
        .exec(function(err, character) {
            if(err) throw err;
            character.remove();
            res.json("Successfully removed " + character.name);
    });
});

module.exports = router;