var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KnownSpell = new Schema({
    level: Number,
    character_class: {
        type: String,
        enum: ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard']
    },
    count: {type: Number, default: 0}
}, {
    timestamps: true
});

module.exports = mongoose.model('KnownSpell', KnownSpell);