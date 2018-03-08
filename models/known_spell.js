var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KnownSpell = new Schema({
    level: Number,
    character_class: {
        type: String,
        enum: ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard']
    },
    first_lvl: {type: Number, default: 0},
    second_lvl: {type: Number, default: 0},
    third_lvl: {type: Number, default: 0},
    fourth_lvl: {type: Number, default: 0},
    fifth_lvl: {type: Number, default: 0},
    sixth_lvl: {type: Number, default: 0},
    seventh_lvl: {type: Number, default: 0},
    eighth_lvl: {type: Number, default: 0},
    ninth_lvl: {type: Number, default: 0}
}, {
    timestamps: true
});

module.exports = mongoose.model('KnownSpell', KnownSpell);