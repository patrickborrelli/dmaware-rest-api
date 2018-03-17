var mongoose = require('mongoose');
var SpellbookSpell = require('./spellbook_spell.js');
var Slot = require('./slot.js');
var Schema = mongoose.Schema;

var Spellbook = new Schema({
    spell_save_dc: Number,
    spell_attack_bonus: Number,
    spellbook_spells: [{
        type: Schema.Types.ObjectId,
        ref: 'SpellbookSpell'
    }],
    slots: [{
        type: Schema.Types.ObjectId,
        ref: 'Slot'
    }]    
}, {
    timestamps: true
});

module.exports = mongoose.model('Spellbook', Spellbook);