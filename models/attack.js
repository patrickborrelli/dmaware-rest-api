var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Attack = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    damage_type: {
        type: String,
        enum: ['ACID', 'BLUDGEONING', 'COLD', 'FIRE', 'FORCE', 'LIGHTNING', 'NECROTIC', 'PIERCING', 'POISON', 'PSYCHIC', 'RADIANT', 'SLASHING', 'THUNDER']
    },
    multiplier: {
        type: Number,
        default: 1
    },
    die_type: {
        type: String,
        enum: ['4', '6', '8', '10', '12', '20']
    },
    additive: {
        type: Number,
        default: 0
    },
    attack_bonus: Number    
}, {
    timestamps: true
});

module.exports = mongoose.model('Attack', Attack);
