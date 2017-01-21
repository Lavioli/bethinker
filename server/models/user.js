var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

var Sticky = require('./sticky');

var Schema = mongoose.Schema;

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
