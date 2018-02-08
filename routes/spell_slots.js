var express = require('express');
var router = express.Router();
var SpellSlot = require('../models/slot');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all spell_slots:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    SpellSlot.find(req.query) 
        .exec(function(err, spell_slots) {
            if(err) return next(err);
            res.json(spell_slots);
    });
})

//POST a newly created spell_slot:
.post(function(req, res, next) {
    SpellSlot.create(req.body, function(err, spell_slot) {
        if(err) return next(err);
        console.log("New spell_slot created");
        res.json(slot);
    });
})

//DELETE all spell_slots:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    SpellSlot.find(req.query)
        .exec(function(err, spell_slots) {
            if(err) return next(err);
            console.log("Removing all spell_slots from the system.");
            console.log(spell_slots.length + " spell_slots were found and are pending delete");
            for(var i = spell_slots.length - 1; i >= 0; i--) {
                spell_slots[i].remove();
            }
            res.json("Successfully removed " + spell_slots.length + " spell_slots");
    })
});

//########################################
router.route('/:slotId')

///GET spell_slot by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    SpellSlot.findById(req.params.slotId)
        .exec(function(err, spell_slot) {
            if(err) throw err;
            res.json(slot);
    });
})

//PUT update club by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    SpellSlot.findByIdAndUpdate(req.params.slotId, {$set: req.body}, {new: true}) 
        .exec(function(err, spell_slot) {
            if(err) throw err;
            res.json(slot);
    });
})

///DELETE club by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    SpellSlot.findById(req.params.slotId)
        .exec(function(err, spell_slot) {
            if(err) throw err;
            spell_slot.remove();
            res.json("Successfully removed " + spell_slot.name);
    });
});

module.exports = router;