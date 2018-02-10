var mongoose = require('mongoose');
var Item = require('./item.js');
var Schema = mongoose.Schema;

var Inventory = new Schema({
    total_weight: Number,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item' 
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Inventory', Inventory);