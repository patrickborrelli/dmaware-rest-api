var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');

var authenticate = require('./authenticate');
var config = require('./config');

//Connect to Mongo database:
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //connected:
    console.log("Successfully connected to Mongo server.");
});

//set up routers:
var routes = require('./routes/index');
var users = require('./routes/users');
var attacks = require('./routes/attacks');
var cantrips = require('./routes/cantrips');
var proficiency_bonuses = require('./routes/proficiency_bonuses');
var character_classes = require('./routes/character_classes');
var races = require('./routes/races');
var ability_score_increases = require('./routes/ability_score_increases');
var skills = require('./routes/skills');
var spells = require('./routes/spells');
var slots = require('./routes/slots');
var spell_slots = require('./routes/spell_slots');
var spellbooks = require('./routes/spellbooks');
var items = require('./routes/items');
var capacities = require('./routes/capacities');
var inventories = require('./routes/inventories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Content-Type");
    next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', routes);
app.use('/users', users);
app.use('/attacks', attacks);
app.use('/cantrips', cantrips);
app.use('/proficiency_bonuses', proficiency_bonuses);
app.use('/character_classes', character_classes);
app.use('/ability_score_increases', ability_score_increases);
app.use('/races', races);
app.use('/skills', skills);
app.use('/spells', spells);
app.use('/slots', slots);
app.use('/spell_slots', spell_slots);
app.use('/spellbooks', spellbooks);
app.use('/items', items);
app.use('/capacities', capacities);
app.use('/inventories', inventories);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
