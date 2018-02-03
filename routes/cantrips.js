var express = require('express');
var router = express.Router();
var Cantrip = require('../models/cantrip');
var Verify = require('./verify');

//###########################
router.route('/')

//GET all cantrips:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Cantrip.find(req.query) 
        .sort({spellcasting_class: 'asc', level: 'asc', name: 'asc'})
        .exec(function(err, cantrips) {
            if(err) return next(err);
            res.json(cantrips);
    });
})

//POST a newly created cantrip:
.post(function(req, res, next) {
    Cantrip.create(req.body, function(err, cantrip) {
        if(err) return next(err);
        console.log("New cantrip created");
        res.json(cantrip);
    });
})

//DELETE all cantrips:
.delete(Verify.verifyAdmin, function(req, res, next) {
    Cantrip.find(req.query)
        .exec(function(err, cantrips) {
            if(err) return next(err);
            console.log("Removing all cantrips from the system.");
            console.log(cantrips.length + " cantrips were found and are pending delete");
            for(var i = cantrips.length - 1; i >= 0; i--) {
                cantrips[i].remove();
            }
            res.json("Successfully removed " + cantrips.length + " cantrips");
    })
});

//########################################
router.route('/:cantripId')

///GET cantrip by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Cantrip.findById(req.params.cantripId)
        .exec(function(err, cantrip) {
            if(err) throw err;
            res.json(cantrip);
    });
})

//PUT update cantrip by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Cantrip.findByIdAndUpdate(req.params.cantripId, {$set: req.body}, {new: true}) 
        .exec(function(err, cantrip) {
            if(err) throw err;
            res.json(cantrip);
    });
})

///DELETE cantrip by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Cantrip.findById(req.params.cantripId)
        .exec(function(err, cantrip) {
            if(err) throw err;
            cantrip.remove();
            res.json("Successfully removed " + cantrip.name);
    });
});

module.exports = router;