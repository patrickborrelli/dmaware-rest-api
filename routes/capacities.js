var express = require('express');
var router = express.Router();
var Capacity = require('../models/capacity');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all capacities:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Capacity.find(req.query) 
        .exec(function(err, capacities) {
            if(err) return next(err);
            res.json(capacities);
    });
})

//POST a newly created capacity:
.post(function(req, res, next) {
    Capacity.create(req.body, function(err, capacity) {
        if(err) return next(err);
        console.log("New capacity created");
        res.json(capacity);
    });
})

//DELETE all capacities:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Capacity.find(req.query)
        .exec(function(err, capacities) {
            if(err) return next(err);
            console.log("Removing all capacities from the system.");
            console.log(capacities.length + " capacities were found and are pending delete");
            for(var i = capacities.length - 1; i >= 0; i--) {
                capacities[i].remove();
            }
            res.json("Successfully removed " + capacities.length + " capacities");
    })
});

//########################################
router.route('/:capacityId')

///GET capacity by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Capacity.findById(req.params.capacityId)
        .exec(function(err, capacity) {
            if(err) throw err;
            res.json(capacity);
    });
})

//PUT update capacity by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Capacity.findByIdAndUpdate(req.params.capacityId, {$set: req.body}, {new: true}) 
        .exec(function(err, capacity) {
            if(err) throw err;
            res.json(capacity);
    });
})

///DELETE capacity by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Capacity.findById(req.params.capacityId)
        .exec(function(err, capacity) {
            if(err) throw err;
            capacity.remove();
            res.json("Successfully removed " + capacity.name);
    });
});

module.exports = router;