var mongoose = require('mongoose');
var Spell = require('./spell.js');
var Schema = mongoose.Schema;

var Slot = new Schema({
    level: {
        type: Number,
        required: true
    },
    spell_count: {
        type: Number,
        default: 0
    },
    used: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Slot', Slot);