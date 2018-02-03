var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProficiencyBonus = new Schema({
    level: Number,
    bonus: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('ProficiencyBonus', ProficiencyBonus);