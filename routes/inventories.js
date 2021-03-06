var express = require('express');
var router = express.Router();
var Inventory = require('../models/inventory');
var async = require('async');
var Verify = require('./verify');

//#####################################
router.route('/')

//GET all inventories:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Inventory.find(req.query) 
        .populate('items')
        .exec(function(err, inventories) {
            if(err) return next(err);
            res.json(inventories);
    });
})

//POST a newly created inventory:
.post(function(req, res, next) {
    Inventory.create(req.body, function(err, inventory) {
        if(err) return next(err);
        console.log("New inventory created");
        res.json(inventory);
    });
})

//DELETE all inventories:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Inventory.find(req.query)
        .exec(function(err, inventories) {
            if(err) return next(err);
            console.log("Removing all inventories from the system.");
            console.log(inventories.length + " inventories were found and are pending delete");
            for(var i = inventories.length - 1; i >= 0; i--) {
                inventories[i].remove();
            }
            res.json("Successfully removed " + inventories.length + " inventories");
    })
});

//########################################
router.route('/:inventoryId')

///GET inventory by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Inventory.findById(req.params.inventoryId)
        .populate('items')
        .exec(function(err, inventory) {
            if(err) throw err;
            res.json(inventory);
    });
})

//PUT update inventory by ID
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    Inventory.findByIdAndUpdate(req.params.inventoryId, {$set: req.body}, {new: true}) 
        .exec(function(err, inventory) {
            if(err) throw err;
            res.json(inventory);
    });
})

///DELETE inventory by ID
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    Inventory.findById(req.params.inventoryId)
        .exec(function(err, inventory) {
            if(err) throw err;
            inventory.remove();
            res.json("Successfully removed " + inventory.name);
    });
});


//########################################
router.route('/buildFromItems')

//POST a newly created inventory based on an array of Items passed in:
.post(function(req, res, next) {
    var items = [];
    var tWeight = 0;
    
    async.waterfall(
        [            
            function(waterfallCallback) {
                async.forEach(req.body.items, function(item, callback) {
                    console.log("Item " + item._id + " weight = " + item.weight);
                    tWeight += item.weight;
                    items.push(item._id)
                    console.log(items);
                }, function(err) {
                    if (err) return next(err);
                    callback();
                });    
                waterfallCallback(null, items);
                console.log("Total weight of items = " + tWeight);        
            },
            function(myItems, waterfallCallback) {
                //create and add item:
                Inventory.create({total_weight: tWeight, items: myItems}, function(err, inventory) {
                    if(err) return next(err);
                    console.log("New inventory created");
                    waterfallCallback(null, inventory);
                });
            }
        ],
        function(err, inventory) {
            if(err) return next(err);
            res.json(inventory);
        }
    )  
    
});


module.exports = router;