var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpellSlot = new Schema({
    level: Number,
    slot_count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('SpellSlot', SpellSlot);