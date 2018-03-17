var mongoose = require('mongoose');
var Item = require('./item.js');
var Schema = mongoose.Schema;

var CharacterClass = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    hit_die: {
        type: String,
        enum: ['4', '6', '8', '10', '12', '20']
    },
    primary_ability: {
        type: [String],
        enum: ['STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'WISDOM', 'INTELLIGENCE', 'CHARISMA']
    },
    saving_throw_proficiency: {
        type: [String],
        enum: ['STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'WISDOM', 'INTELLIGENCE', 'CHARISMA']
    },
    armor_proficiency: [String],
    weapon_proficiency: [String],
    spellcasting_class: String,
    spellcasting_ability: String,
    primary_weapon: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    secondary_weapon: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    tertiary_weapon: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    armor: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    mandatory_equipment: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('CharacterClass', CharacterClass);