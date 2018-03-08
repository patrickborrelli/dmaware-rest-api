var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Spell = new Schema({
    level: Number,
    character_class: {
        type: String,
        enum: ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard']
    },
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Spell', Spell);