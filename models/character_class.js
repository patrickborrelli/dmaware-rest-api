var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProficiencyBonus = require('./proficiency_bonus.js');

var CharacterClass = new Schema({
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
    feature: [String],
    proficiency_bonus: {
        type: Schema.Types.ObjectId,
        ref: 'ProficiencyBonus'
    }    
}, {
    timestamps: true
});

module.exports = mongoose.model('CharacterClass', CharacterClass);