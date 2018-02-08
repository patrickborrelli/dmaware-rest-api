var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Skill = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bonus: Number,
    controlling_ability: {
        type: String,
        enum: ['STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'WISDOM', 'INTELLIGENCE', 'CHARISMA']
    },
    proficiency: {
        type: Boolean,
        default: false
    }    
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', Skill);