var express = require('express');
var router = express.Router();
var KnownSpell = require('../models/known_spell');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all known_spells:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    KnownSpell.find(req.query) 
        .exec(function(err, known_spells) {
            if(err) return next(err);
            res.json(known_spells);
    });
})

//POST a newly created known_spell:
.post(function(req, res, next) {
    KnownSpell.create(req.body, function(err, known_spell) {
        if(err) return next(err);
        console.log("New known_spell created");
        res.json(slot);
    });
})

//DELETE all known_spells:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    KnownSpell.find(req.query)
        .exec(function(err, known_spells) {
            if(err) return next(err);
            console.log("Removing all known_spells from the system.");
            console.log(known_spells.length + " known_spells were found and are pending delete");
            for(var i = known_spells.length - 1; i >= 0; i--) {
                known_spells[i].remove();
            }
            res.json("Successfully removed " + known_spells.length + " known_spells");
    })
});

//########################################
router.route('/:knownSpellId')

///GET known_spell by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    KnownSpell.findById(req.params.knownSpellId)
        .exec(function(err, known_spell) {
            if(err) throw err;
            res.json(slot);
    });
})

//PUT update known spell by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    KnownSpell.findByIdAndUpdate(req.params.knownSpellId, {$set: req.body}, {new: true}) 
        .exec(function(err, known_spell) {
            if(err) throw err;
            res.json(slot);
    });
})

///DELETE known spell by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    KnownSpell.findById(req.params.knownSpellId)
        .exec(function(err, known_spell) {
            if(err) throw err;
            known_spell.remove();
            res.json("Successfully removed " + known_spell.name);
    });
});

module.exports = router;