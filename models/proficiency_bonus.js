var mongoose = require('mongoose');
var CharacterClass = require('./character_class.js');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
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

ProficiencyBonus.plugin(deepPopulate);

module.exports = mongoose.model('ProficiencyBonus', ProficiencyBonus);