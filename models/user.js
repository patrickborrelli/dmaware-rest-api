var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    first_name: {
        type: String,
        default: '',
        trim: true
    },
    last_name: {
        type: String,
        default: '',
        trim: true
    },
    username: {
        type: String,
        default: '',
        trim: true, 
        required: true
    },
    password: {
        type: String,
        default: '',
        trim: true
    },
    email_address: {
        type: String,
        trim: true
    },
    mobile: String,
    profile_image_url:  {
        type: String,
        default: './images/defaultUser.png'
    },
    active: {
        type: Boolean,
        default: true
    },
    state: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    OauthId: String,
    OauthToken: String,
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

User.methods.getFullName = function() {
    return(this.first_name + ' ' + this.last_name);
};

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
