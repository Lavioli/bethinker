var BasicStrategy = require('passport-http').BasicStrategy;

var User = require('../models/user');

module.exports = new BasicStrategy(function(username, password, callback) {
    User.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            callback(err);
            return;
        }
        if (!user) {
            return callback(null, false, {
                message: 'Invalid username/password. Please try again.'
            });
        }

        user.validatePassword(password, function(err, isValid) {
            if (err) {
                return callback(err);
            }

            if (!isValid) {
                return callback(null, false, {
                    message: 'Invalid username/password. Please try again.'
                });
            }
            return callback(null, user);
        });
    });
});
