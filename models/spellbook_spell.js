var mongoose = require('mongoose');
var Spell = require('./spell.js');
var Schema = mongoose.Schema;

var SpellbookSpell = new Schema({
    spell: {
        type: Schema.Types.ObjectId,
        ref: 'Spell'
    },
    prepared: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SpellbookSpell', SpellbookSpell);