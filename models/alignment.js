var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Alignment = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Alignment', Alignment);
