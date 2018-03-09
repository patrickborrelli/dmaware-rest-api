var mongoose = require('mongoose');
var CharacterClass = require('./character_class.js');
var Race = require('./race.js');
var Skill = require('./skill.js');
var Inventory = require('./inventory.js');
var Attack = require('./attack.js');
var Spellbook = require('./spellbook');
var User = require('./user');

var Schema = mongoose.Schema;

var Character = new Schema({
    name: {
        type: String,
        trim: true
    },
    character_class: {
        type: Schema.Types.ObjectId,
        ref: 'CharacterClass'
    },
    character_level: {
        type: Number,
        default: 1
    },
    race: {
        type: Schema.Types.ObjectId,
        ref: 'Race'
    },
    experience_points: {
        type: Number,
        default: 0
    },
    strength: {
        type: Number,
        default: 0
    },
    dexterity: {
        type: Number,
        default: 0
    },
    constitution: {
        type: Number,
        default: 0
    },
    wisdom: {
        type: Number,
        default: 0
    },
    intelligence: {
        type: Number,
        default: 0
    },
    charisma: {
        type: Number,
        default: 0
    },
    strength_modifier: {
        type: Number,
        default: 0
    },
    dexterity_modifier: {
        type: Number,
        default: 0
    },
    constitution_modifier: {
        type: Number,
        default: 0
    },
    wisdom_modifier: {
        type: Number,
        default: 0
    },
    intelligence_modifier: {
        type: Number,
        default: 0
    },
    charisma_modifier: {
        type: Number,
        default: 0
    },
    proficiency_bonus: {
        type: Number,
        default: 0
    },
    hit_point_maximum: {
        type: Number,
        default: 0
    },
    hit_points: {
        type: Number,
        default: 0
    },
    hit_points_temporary: {
        type: Number,
        default: 0
    },
    hit_die_type: {
        type: Number,
        min: 4,
        max: 20
    },
    hit_dice_count: {
        type: Number,
        default: 1
    },
    speed_base: {
        type: Number,        
        default: 30
    },
    speed_current: {
        type: Number,        
        default: 30
    },
    saving_throw_modifier_strength: {
        type: Number,        
        default: 0
    },
    saving_throw_modifier_dexterity: {
        type: Number,        
        default: 0
    },
    saving_throw_modifier_constitution: {
        type: Number,        
        default: 0
    },
    saving_throw_modifier_wisdom: {
        type: Number,        
        default: 0
    },
    saving_throw_modifier_intelligence: {
        type: Number,        
        default: 0
    },
    saving_throw_modifier_charisma: {
        type: Number,        
        default: 0
    },
    skills: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    inventory: {
        type: Schema.Types.ObjectId,
        ref: 'Inventory'
    },
    armor_class: {
        type: Number,
        default: 10
    }, 
    alignment: {
        type: String,
        default: 'TRUE_NEUTRAL',
        enum: ['LAWFUL_GOOD', 'LAWFUL_NEUTRAL', 'LAWFUL_EVIL', 'TRUE_NEUTRAL', 'CHAOTIC_GOOD', 'CHAOTIC_NEUTRAL', 'CHAOTIC_EVIL']
    }, 
    languages: [String], 
    inspiration: {
        type: Boolean,
        default: false
    },
    saving_throw_proficiency_strength: {
        type: Boolean,        
        default: false
    },
    saving_throw_proficiency_dexterity: {
        type: Boolean,        
        default: false
    },
    saving_throw_proficiency_constitution: {
        type: Boolean,        
        default: false
    },
    saving_throw_proficiency_wisdom: {
        type: Boolean,        
        default: false
    },
    saving_throw_proficiency_intelligence: {
        type: Boolean,        
        default: false
    },
    saving_throw_proficiency_charisma: {
        type: Boolean,        
        default: false
    },
    attacks: [{
        type: Schema.Types.ObjectId,
        ref: 'Attack'
    }],
    attack_count: {   //Attacks per turn
        type: Number,
        default: 1
    },
    personality_traits: [String],
    ideals: [String],
    bonds: [String],
    flaws: [String],
    features_traits: [String],
    background: String,
    proficiencies: [String],
    passive_perception: Number,
    age: Number,
    height: Number, //in inches
    weight: Number, //in pounds
    eyes: String,
    skin: String,
    hair: String,
    char_image_url: String,
    backstory: String,
    treasure: [String],
    spellbooks: [{
        type: Schema.Types.ObjectId,
        ref: 'Spellbook'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }       
}, {
    timestamps: true
});

module.exports = mongoose.model('Character', Character);