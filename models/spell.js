var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Component = new Schema({
    material: Boolean,
    verbal: Boolean,
    somatic: Boolean,
    raw:  {
        type: String,
        trim: true
    },
    materials_needed:  [{
        type: String
    }]
});

var Spell = new Schema({
    level: Number,
    source: {
        type: String,
        trim: true
    },
    character_class: [{
        type: String,
        enum: ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Sorcerer', 'Warlock', 'Wizard']
    }],
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    range:  {
        type: String,
        trim: true
    },
    ritual: Boolean,
    school:  {
        type: String,
        trim: true
    },
    duration:  {
        type: String,
        trim: true
    }, 
    casting_time:  {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    tags: [{
        type: String
    }],
    higher_levels: {
        type: String,
        trim: true
    },
    components: {
        type: Component
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Spell', Spell);