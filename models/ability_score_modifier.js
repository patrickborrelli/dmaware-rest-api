var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AbilityScoreModifier = new Schema({
    score: Number,
    increase: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('AbilityScoreModifier', AbilityScoreModifier);