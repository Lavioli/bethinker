var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

var User = require('./user');

var Schema = mongoose.Schema;

var StickySchema = new Schema({
    _user: { type: String, ref: 'User'},
    title: String,
    content: { type: String, required: true },
    time : { type : Date, default: Date.now }
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
