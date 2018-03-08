var express = require('express');
var router = express.Router();
var SpellbookSpell = require('../models/spellbook_spell');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all spellbook_spells:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    SpellbookSpell.find(req.query) 
        .exec(function(err, spellbook_spells) {
            if(err) return next(err);
            res.json(spellbook_spells);
    });
})

//POST a newly created spellbook_spell:
.post(function(req, res, next) {
    SpellbookSpell.create(req.body, function(err, spellbook_spell) {
        if(err) return next(err);
        console.log("New spellbook_spell created");
        res.json(slot);
    });
})

//DELETE all spellbook_spells:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    SpellbookSpell.find(req.query)
        .exec(function(err, spellbook_spells) {
            if(err) return next(err);
            console.log("Removing all spellbook_spells from the system.");
            console.log(spellbook_spells.length + " spellbook_spells were found and are pending delete");
            for(var i = spellbook_spells.length - 1; i >= 0; i--) {
                spellbook_spells[i].remove();
            }
            res.json("Successfully removed " + spellbook_spells.length + " spellbook_spells");
    })
});

//########################################
router.route('/:spellbookSpellId')

///GET spellbook_spell by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    SpellbookSpell.findById(req.params.spellbookSpellId)
        .exec(function(err, spellbook_spell) {
            if(err) throw err;
            res.json(slot);
    });
})

//PUT update spellbook spell by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    SpellbookSpell.findByIdAndUpdate(req.params.spellbookSpellId, {$set: req.body}, {new: true}) 
        .exec(function(err, spellbook_spell) {
            if(err) throw err;
            res.json(slot);
    });
})

///DELETE spellbook spell by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    SpellbookSpell.findById(req.params.spellbookSpellId)
        .exec(function(err, spellbook_spell) {
            if(err) throw err;
            spellbook_spell.remove();
            res.json("Successfully removed " + spellbook_spell.name);
    });
});

module.exports = router;