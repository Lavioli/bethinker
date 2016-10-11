var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Sticky = require('./sticky');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    username: {
        _id: Number,
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    stickies: [{ 
        type: Schema.Types.ObjectId, 
        ref:'Sticky'
    }]
});

UserSchema.methods.validatePassword = function(password, callback) {
	bcrypt.compare(password, this.password, function(err, isValid) {
		if (err) {
			callback(err);
			return;
		}
		callback(null, isValid);
	});
};

module.exports = mongoose.model('User', UserSchema);