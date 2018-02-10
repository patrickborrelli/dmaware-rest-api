var mongoose = require('mongoose');
var Capacity = require('./capacity.js');
var Schema = mongoose.Schema;

var Item = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    weight: Number,
    description: {
        type: String,
        trim: true
    },
    cost: Number, //in copper pieces
    damage_inducing: Boolean,
    damage_type: {
        type: String,
        enum: ['ACID', 'BLUDGEONING', 'COLD', 'FIRE', 'FORCE', 'LIGHTNING', 'NECROTIC', 'PIERCING', 'POISON', 'PSYCHIC', 'RADIANT', 'SLASHING', 'THUNDER']
    },
    multiplier: Number, //if damage inducing
    die_type: Number,
    container: Boolean,
    capacity: {
        type: Schema.Types.ObjectId,
        ref: 'Capacity'
    },
    limitless: Boolean, //if a valid container
    empty: Boolean, //if a valid container
    items: [{  //if a valid container
        type: Schema.Types.ObjectId,
        ref: 'Item'    
    }]    
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', Item);