var express = require('express');
var router = express.Router();
var SpellbookSpells = require('../models/spellbook_spell');
var Slots = require('../models/slot');
var Spellbook = require('../models/spellbook');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all spellbooks:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Spellbook.find(req.query) 
        .populate('spellbook_spells')
        .populate('slots')
        .exec(function(err, spellbooks) {
            if(err) return next(err);
            res.json(spellbooks);
    });
})

//POST a newly created spellbook:
.post(function(req, res, next) {
    Spellbook.create(req.body, function(err, spellbook) {
        if(err) return next(err);
        console.log("New spellbook created");
        res.json(spellbook);
    });
})

//DELETE all spellbooks:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Spellbook.find(req.query)
        .exec(function(err, spellbooks) {
            if(err) return next(err);
            console.log("Removing all spellbooks from the system.");
            console.log(spellbooks.length + " spellbooks were found and are pending delete");
            for(var i = spellbooks.length - 1; i >= 0; i--) {
                spellbooks[i].remove();
            }
            res.json("Successfully removed " + spellbooks.length + " spellbooks");
    })
});

//########################################
router.route('/:spellbookId')

///GET spellbook by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Spellbook.findById(req.params.spellbookId)
        .populate('spellbook_spells')
        .populate('slots')
        .exec(function(err, spellbook) {
            if(err) throw err;
            res.json(spellbook);
    });
})

//PUT update spellbook by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Spellbook.findByIdAndUpdate(req.params.spellbookId, {$set: req.body}, {new: true}) 
        .exec(function(err, spellbook) {
            if(err) throw err;
            res.json(spellbook);
    });
})

///DELETE spellbook by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Spellbook.findById(req.params.spellbookId)
        .exec(function(err, spellbook) {
            if(err) throw err;
            spellbook.remove();
            res.json("Successfully removed " + spellbook.name);
    });
});

module.exports = router;