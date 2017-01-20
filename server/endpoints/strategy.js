import mongoose from 'mongoose';
import { BasicStrategy } from 'passport-http';

import User from '../models/user';

export default new BasicStrategy(function(username, password, callback) {
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
