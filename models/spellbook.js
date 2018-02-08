var mongoose = require('mongoose');
var Spell = require('./spell.js');
var SpellSlot = require('./spell_slot.js');
var Schema = mongoose.Schema;

var Spellbook = new Schema({
    spellcasting_class: {
        type: String,
        trim: true,
        enum: ['BARD', 'SORCERER', 'WIZARD', 'WARLOCK', 'CLERIC', 'DRUID', 'PALADIN', 'RANGER']
    },
    spellcasting_ability: {
        type: String,
        trim: true,
        enum: ['STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'WISDOM', 'INTELLIGENCE', 'CHARISMA']
    },
    spell_save_dc: Number,
    spell_attack_bonus: Number,
    spells: [{
        type: Schema.Types.ObjectId,
        ref: 'Spell'
    }],
    spell_slots: [{
        type: Schema.Types.ObjectId,
        ref: 'SpellSlot'
    }]    
}, {
    timestamps: true
});

module.exports = mongoose.model('Spellbook', Spellbook);