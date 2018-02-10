var express = require('express');
var router = express.Router();
var Slot = require('../models/slot');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all slots:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Slot.find(req.query) 
        .exec(function(err, slots) {
            if(err) return next(err);
            res.json(slots);
    });
})

//POST a newly created slot:
.post(function(req, res, next) {
    Slot.create(req.body, function(err, slot) {
        if(err) return next(err);
        console.log("New slot created");
        res.json(slot);
    });
})

//DELETE all slots:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Slot.find(req.query)
        .exec(function(err, slots) {
            if(err) return next(err);
            console.log("Removing all slots from the system.");
            console.log(slots.length + " slots were found and are pending delete");
            for(var i = slots.length - 1; i >= 0; i--) {
                slots[i].remove();
            }
            res.json("Successfully removed " + slots.length + " slots");
    })
});

//########################################
router.route('/:slotId')

///GET slot by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Slot.findById(req.params.slotId)
        .exec(function(err, slot) {
            if(err) throw err;
            res.json(slot);
    });
})

//PUT update slot by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Slot.findByIdAndUpdate(req.params.slotId, {$set: req.body}, {new: true}) 
        .exec(function(err, slot) {
            if(err) throw err;
            res.json(slot);
    });
})

///DELETE slot by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Slot.findById(req.params.slotId)
        .exec(function(err, slot) {
            if(err) throw err;
            slot.remove();
            res.json("Successfully removed " + slot.name);
    });
});

module.exports = router;