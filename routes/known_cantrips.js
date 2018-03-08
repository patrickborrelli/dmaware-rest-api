var express = require('express');
var router = express.Router();
var KnownCantrip = require('../models/known_cantrip');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all known_cantrips:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    KnownCantrip.find(req.query) 
        .exec(function(err, known_cantrips) {
            if(err) return next(err);
            res.json(known_cantrips);
    });
})

//POST a newly created known_cantrip:
.post(function(req, res, next) {
    KnownCantrip.create(req.body, function(err, known_cantrip) {
        if(err) return next(err);
        console.log("New known_cantrip created");
        res.json(slot);
    });
})

//DELETE all known_cantrips:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    KnownCantrip.find(req.query)
        .exec(function(err, known_cantrips) {
            if(err) return next(err);
            console.log("Removing all known_cantrips from the system.");
            console.log(known_cantrips.length + " known_cantrips were found and are pending delete");
            for(var i = known_cantrips.length - 1; i >= 0; i--) {
                known_cantrips[i].remove();
            }
            res.json("Successfully removed " + known_cantrips.length + " known_cantrips");
    })
});

//########################################
router.route('/:knownCantripId')

///GET known_cantrip by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    KnownCantrip.findById(req.params.knownCantripId)
        .exec(function(err, known_cantrip) {
            if(err) throw err;
            res.json(slot);
    });
})

//PUT update known cantrip by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    KnownCantrip.findByIdAndUpdate(req.params.knownCantripId, {$set: req.body}, {new: true}) 
        .exec(function(err, known_cantrip) {
            if(err) throw err;
            res.json(slot);
    });
})

///DELETE known cantrip by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    KnownCantrip.findById(req.params.knownCantripId)
        .exec(function(err, known_cantrip) {
            if(err) throw err;
            known_cantrip.remove();
            res.json("Successfully removed " + known_cantrip.name);
    });
});

module.exports = router;