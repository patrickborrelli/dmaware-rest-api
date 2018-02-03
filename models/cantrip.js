var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cantrip = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: Number,
        required: true
    }, 
    spellcasting_class: {
        type: String,
        required: true,
        enum: ['ARCANE', 'BARD', 'CLERIC', 'DRUID', 'PALADIN', 'RANGER']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cantrip', Cantrip);