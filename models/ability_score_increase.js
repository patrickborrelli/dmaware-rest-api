var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AbilityScoreIncrease = new Schema({
    ability: {
        type: String,
        enum: ['STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'WISDOM', 'INTELLIGENCE', 'CHARISMA']
    },
    increase: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('AbilityScoreIncrease', AbilityScoreIncrease);