var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Character = require('../models/character')
var Verify = require('./verify');


//#####################################
router.route('/')

//GET all users:
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    User.find(req.query) 
        .sort({last_name: 'asc'})
        .exec(function(err, users) {
            if(err) return next(err);
            res.json(users);
    });
})

//DELETE all users:
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    User.find(req.query) 
        .exec(function(err, users) {
            if(err) return next(err);
            console.log("Removing all users from the system.");
            console.log(users.length + " users were found and are pending delete");
            for(var i = users.length - 1; i >= 0; i--) {
                users[i].remove();
            }
            res.json("Successfully removed " + users.length + " users");
    });
});

//#######################################
router.route('/:userId')

//GET user by ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    User.findById(req.params.userId)
        .exec(function(err, user) {
            if(err) return next(err);
            res.json(user);
        })
})

//PUT - update user by ID:
.put(Verify.verifyOrdinaryUser, function(req, res, next) {
    User.findByIdAndUpdate(req.params.userId, {$set: req.body}, {new: true})
        .exec(function(err, user) {
            if(err) return next(err);
            res.json(user);
        })
})

//DELETE user by ID:
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    User.findById(req.params.userId) 
        .exec(function(err, user) {
            if(err) return next(err);
            var full = user.getFullName();
            user.remove();
            res.json("Successfully removed user: " + full);
        });
});


//#######################################
router.route('/getCharacters/:userId')

//GET characters by user ID
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Character.find({'user': req.params.userId})
        .exec(function(err, characters) {
            if(err) return next(err);
            res.json(characters);
        })
});


//#######################################
router.post('/register', function(req, res, next) {
    console.log("Starting to register user");
   User.register(new User(
           {
               username : req.body.username,
               first_name: req.body.first_name,
               last_name: req.body.last_name,
               email_address: req.body.email_address,
               mobile: req.body.mobile,
               profile_image_url: req.body.profile_image_url,
               state: req.body.state,
               country: req.body.country
           }
        ),
        req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }user.save(function(err, user) {
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json(user);
            });
        });        
    });
});

//########################################
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user' + err
        });
      }
        
      var token = Verify.getToken({"username":user.username, "_id":user._id, "admin":user.admin});
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        fullname: user.getFullName(),
        token: token,
        userId: user._id,
        admin: user.admin
      });
    }); 
  })(req,res,next);
});

router.post('/logout', function(req, res, next) {
    console.log("attempting to log out");
    req.logOut();
    res.send({authenticated: req.isAuthenticated() });
});

module.exports = router;
