var express = require('express');
var router = express.Router();
var Attack = require('../models/attack');

//#####################################
router.route('/')

//GET all attacks:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Attack.find(req.query) 
        .sort({name: 'asc'})
        .exec(function(err, attacks) {
            if(err) return next(err);
            res.json(attacks);
    });
})

//POST a newly created attack:
.post(function(req, res, next) {
    Attack.create(req.body, function(err, attack) {
        if(err) return next(err);
        console.log("New attack created");
        res.json(attack);
    });
})

//DELETE all attacks:
.delete(Verify.verifyAdmin, function(req, res, next) {
    Attack.find(req.query)
        .exec(function(err, attacks) {
            if(err) return next(err);
            console.log("Removing all attacks from the system.");
            console.log(attacks.length + " attacks were found and are pending delete");
            for(var i = attacks.length - 1; i >= 0; i--) {
                attacks[i].remove();
            }
            res.json("Successfully removed " + attacks.length + " attacks");
    });
});

module.exports = router;