var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all items:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Item.find(req.query) 
        .exec(function(err, items) {
            if(err) return next(err);
            res.json(items);
    });
})

//POST a newly created item:
.post(function(req, res, next) {
    Item.create(req.body, function(err, item) {
        if(err) return next(err);
        console.log("New item created");
        res.json(item);
    });
})

//DELETE all items:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Item.find(req.query)
        .exec(function(err, items) {
            if(err) return next(err);
            console.log("Removing all items from the system.");
            console.log(items.length + " items were found and are pending delete");
            for(var i = items.length - 1; i >= 0; i--) {
                items[i].remove();
            }
            res.json("Successfully removed " + items.length + " items");
    })
});

//########################################
router.route('/:itemId')

///GET item by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Item.findById(req.params.itemId)
        .exec(function(err, item) {
            if(err) throw err;
            res.json(item);
    });
})

//PUT update item by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Item.findByIdAndUpdate(req.params.itemId, {$set: req.body}, {new: true}) 
        .exec(function(err, item) {
            if(err) throw err;
            res.json(item);
    });
})

///DELETE item by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Item.findById(req.params.itemId)
        .exec(function(err, item) {
            if(err) throw err;
            item.remove();
            res.json("Successfully removed " + item.name);
    });
});

module.exports = router;