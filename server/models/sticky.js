var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var StickySchema = new Schema({
    _user: { type: String, ref: 'User'},
    title: String,
    content: { type: String, required: true }
    // date: Date,
    // rating: { type: Number, min: 1, max: 3 }
});


StickySchema.methods.validatePassword = function(password, callback) {
	bcrypt.compare(password, user.password, function(err, isValid) {
		if(err) {
			callback(err);
			return;
		}
		callback(null, isValid);
	});
};

module.exports = mongoose.model('Sticky', StickySchema);
