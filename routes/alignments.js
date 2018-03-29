var express = require('express');
var router = express.Router();
var Alignment = require('../models/alignment');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all alignments:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Alignment.find(req.query) 
        .exec(function(err, alignments) {
            if(err) return next(err);
            res.json(alignments);
    });
})

//POST a newly created alignment:
.post(function(req, res, next) {
    Alignment.create(req.body, function(err, alignment) {
        if(err) return next(err);
        console.log("New alignment created");
        res.json(alignment);
    });
})

//DELETE all alignments:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Alignment.find(req.query)
        .exec(function(err, alignments) {
            if(err) return next(err);
            console.log("Removing all alignments from the system.");
            console.log(alignments.length + " alignments were found and are pending delete");
            for(var i = alignments.length - 1; i >= 0; i--) {
                alignments[i].remove();
            }
            res.json("Successfully removed " + alignments.length + " alignments");
    })
});

//########################################
router.route('/:alignmentId')

///GET alignment by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Alignment.findById(req.params.alignmentId)
        .exec(function(err, alignment) {
            if(err) throw err;
            res.json(alignment);
    });
})

//PUT update alignment by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Alignment.findByIdAndUpdate(req.params.alignmentId, {$set: req.body}, {new: true}) 
        .exec(function(err, alignment) {
            if(err) throw err;
            res.json(alignment);
    });
})

///DELETE alignment by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Alignment.findById(req.params.alignmentId)
        .exec(function(err, alignment) {
            if(err) throw err;
            alignment.remove();
            res.json("Successfully removed " + alignment.name);
    });
});

module.exports = router;