var mongoose = require('mongoose');
var CharacterClass = require('./character_class.js');
var Schema = mongoose.Schema;

var ProficiencyBonus = new Schema({
    level: Number,
    bonus: Number, 
    char_class: {
        type: Schema.Types.ObjectId,
        ref: 'CharacterClass'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ProficiencyBonus', ProficiencyBonus);