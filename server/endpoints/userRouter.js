var express = require('express'),
    passport = require('passport'),
    bcrypt = require('bcryptjs');

var User = require('../models/user');

var userRouter = express.Router();


/************************************USER ENDPOINTS***************************************/
//should list all users along with their passwords
userRouter.get('/user', function(req,res){
    User.find(function(err, user){
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(user);
    });
});

//should list only the current user's user info
userRouter.get('/users/:username', passport.authenticate('basic', {session: false}), function(req, res) {
    var routerUsername = req.params.username;
    var authenticatedUsername = req.user.username.toString();
    var authenticatedId = req.user._id.toString();

    if (routerUsername !== authenticatedUsername){
        return res.status(422).json({
            message: "Unauthorized"
                });
    }
    User.findOne({_id: authenticatedId}, function(err, user){
       if(err) {
           return res.status(500).json({
               message: 'Internal Server Error'
           });
       }
       res.status(200).json({"._id": user._id, "username": user.username})
    });
});

//should allow user to delete an account
userRouter.delete("/users/:username", passport.authenticate('basic', {session: false}), function(req, res) {
    var routerUsername = req.params.username;
    var authenticatedUsername = req.user.username.toString();

    if (routerUsername !== authenticatedUsername){
        return res.status(422).json({
            message: "Unauthorized"
                });
            }

    User.findOneAndRemove({username: routerUsername}, function(user) {
            res.status(200).json({message: "User deleted"});
    });
});

//allow a user to create a username
userRouter.post('/createuser', function(req, res) {
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }
    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }
    var username = req.body.username;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }
    username = username.trim();

    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }
    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }
    var password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }
    password = password.trim();
    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
            var user = new User({
                username: username,
                password: hash
            });
            user.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }
                console.log('Username and password created');
                return res.status(201).location('/users/' + user._id).json({});
            });
        });
    });
});


//Allows users to edit their password
userRouter.put("/users/:username", passport.authenticate('basic', {
        session: false
    }), function(req, res) {
        //req to varibles
        var username = req.params.username,
            newName = req.body.username,
            newPassword = req.body.password,
            authenticatedUsername = req.user.username,
            type = req.body.type;
        //conditionals
        if (username.toString() !== authenticatedUsername.toString()) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        if(type === "updateUsernamePassword") {
            if(typeof newName !== 'string') {
                return res.status(401).json({
                    message: 'Incorrect field type: username'
                });
            }
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }
                bcrypt.hash(newPassword, salt, function(err, hash) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Internal server error'
                        });
                    }
                 User.findByIdAndUpdate(
                    id,
                    {username: newName.toString(), password: hash.toString()},
                    {upsert: true},
                    function(err, user) {
                        res.status(200).json({});
                        });
                });
            });
        }
        if(type === "updateUsername") {
            console.log(req.body);
            console.log(req.body);
           if(typeof newName !== 'string') {
                return res.status(422).json({
                    'message': 'Incorrect field type: username'
                });
            }
            User.findByIdAndUpdate(
                id,
                    {username: newName.toString()},
                        {upsert: true},
                        function(err, user) {
                            res.status(200).json({})
                        }
            );
        }
        if(type === "updatePassword") {
             bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }
                bcrypt.hash(newPassword, salt, function(err, hash) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Internal server error'
                        });
                    }
                 User.findByIdAndUpdate(
                    id,
                    {password: hash.toString()},
                    {upsert: true},
                    function(err, user) {
                        res.status(200).json({message: "Okay"});
                        });
                });
            });
        }
});

module.exports = userRouter;
