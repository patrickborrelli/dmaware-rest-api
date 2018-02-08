var mongoose = require('mongoose');
var Spell = require('./spell.js');
var Schema = mongoose.Schema;

var Slot = new Schema({
    level: {
        type: Number,
        required: true
    },
    spell: {
        type: Schema.Types.ObjectId,
        ref: 'Spell'
    } 
}, {
    timestamps: true
});

module.exports = mongoose.model('Slot', Slot);