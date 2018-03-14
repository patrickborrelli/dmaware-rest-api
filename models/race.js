var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AbilityScoreIncrease = require('./ability_score_increase');

var Race = new Schema({
    name: {
        type: String,
        trim: true
    },
    base_speed: Number,
    description: String,
    age_of_adulthood: Number,
    age_of_mortality: Number,
    height_low: Number, //in inches
    height_high: Number,
    primary: Boolean,
    size: {
        type: String,
        enum: ['TINY', 'SMALL', 'MEDIUM', 'LARGE', 'HUGE', 'GARGANTUAN']
    },
    subraces: [{
        type: Schema.Types.ObjectId,
        ref: 'Race'
    }],
    alignment: {
        type: String,
    },
    core_languages: [String],
    additional_languages: Number,
    traits: String,
    ability_score_increase: [{type: Schema.Types.ObjectId, ref: 'AbilityScoreIncrease' }] 
}, {
    timestamps: true
});

module.exports = mongoose.model('Race', Race);