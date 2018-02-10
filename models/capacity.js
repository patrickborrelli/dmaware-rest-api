var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Capacity = new Schema({
    capacity_type: {
        type: String,
        enum: ['VOLUME', 'SPATIAL', 'WEIGHT', 'UNIT']
    },
    unit: { 
        type: String,
        enum: ['CUBIC_FEET', 'OUNCES', 'PINTS', 'QUARTS', 'GALLONS', 'POUNDS']
    },
    quantity: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Capacity', Capacity);