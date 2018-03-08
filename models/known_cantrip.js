var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KnownCantrip = new Schema({
    level: Number,
    character_class: {
        type: String,
        enum: ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard']
    },
    count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('KnownCantrip', KnownCantrip);