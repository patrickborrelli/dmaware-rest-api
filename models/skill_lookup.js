var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillLookup = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    controlling_ability: {
        type: String,
        enum: ['STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'WISDOM', 'INTELLIGENCE', 'CHARISMA']
    }  
}, {
    timestamps: true
});

module.exports = mongoose.model('SkillLookup', SkillLookup);