var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Spell = new Schema({
    level: Number,
    name: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Spell', Spell);