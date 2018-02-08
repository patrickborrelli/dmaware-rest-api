var express = require('express');
var router = express.Router();
var Spell = require('../models/spell');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all spells:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Spell.find(req.query) 
        .sort({name: 'asc'})
        .exec(function(err, spells) {
            if(err) return next(err);
            res.json(spells);
    });
})

//POST a newly created spell:
.post(function(req, res, next) {
    Spell.create(req.body, function(err, spell) {
        if(err) return next(err);
        console.log("New spell created");
        res.json(spell);
    });
})

//DELETE all spells:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Spell.find(req.query)
        .exec(function(err, spells) {
            if(err) return next(err);
            console.log("Removing all spells from the system.");
            console.log(spells.length + " spells were found and are pending delete");
            for(var i = spells.length - 1; i >= 0; i--) {
                spells[i].remove();
            }
            res.json("Successfully removed " + spells.length + " spells");
    })
});

//########################################
router.route('/:spellId')

///GET spell by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Spell.findById(req.params.spellId)
        .exec(function(err, spell) {
            if(err) throw err;
            res.json(spell);
    });
})

//PUT update club by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Spell.findByIdAndUpdate(req.params.spellId, {$set: req.body}, {new: true}) 
        .exec(function(err, spell) {
            if(err) throw err;
            res.json(spell);
    });
})

///DELETE club by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Spell.findById(req.params.spellId)
        .exec(function(err, spell) {
            if(err) throw err;
            spell.remove();
            res.json("Successfully removed " + spell.name);
    });
});

module.exports = router;