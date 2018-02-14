var mongoose = require('mongoose');
var CharacterClass = require('./character_class.js');

var Schema = mongoose.Schema;

var Feature = new Schema({
    char_class: {
        type: Schema.Types.ObjectId,
        ref: 'CharacterClass'
    },
    level: Number,
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

module.exports = mongoose.model('Feature', Feature);