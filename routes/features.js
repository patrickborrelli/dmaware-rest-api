var express = require('express');
var router = express.Router();
var Feature = require('../models/feature');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all features:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Feature.find(req.query) 
        .exec(function(err, features) {
            if(err) return next(err);
            res.json(features);
    });
})

//POST a newly created feature:
.post(function(req, res, next) {
    Feature.create(req.body, function(err, feature) {
        if(err) return next(err);
        console.log("New feature created");
        res.json(feature);
    });
})

//DELETE all features:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Feature.find(req.query)
        .exec(function(err, features) {
            if(err) return next(err);
            console.log("Removing all features from the system.");
            console.log(features.length + " features were found and are pending delete");
            for(var i = features.length - 1; i >= 0; i--) {
                features[i].remove();
            }
            res.json("Successfully removed " + features.length + " features");
    })
});

//########################################
router.route('/:featureId')

///GET feature by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Feature.findById(req.params.featureId) 
        .exec(function(err, feature) {
            if(err) throw err;
            res.json(feature);
    });
})

//PUT update feature by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Feature.findByIdAndUpdate(req.params.featureId, {$set: req.body}, {new: true}) 
        .exec(function(err, feature) {
            if(err) throw err;
            res.json(feature);
    });
})

///DELETE feature by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Feature.findById(req.params.featureId)
        .exec(function(err, feature) {
            if(err) throw err;
            feature.remove();
            res.json("Successfully removed " + feature.name);
    });
});

module.exports = router;