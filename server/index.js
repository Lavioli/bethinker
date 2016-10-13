import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/stickies'); // connect to our database
import User from './models/user';
import Sticky from './models/sticky';
import bodyParser from 'body-parser';
var bcrypt = require('bcryptjs');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

//Basic strategy
var stategy = new BasicStrategy(function(username, password, callback) {
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

passport.use(stategy);

//app.use(passport.initialize());
const jsonParser = bodyParser.json();
const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

const app = express();
 
app.use(express.static(process.env.CLIENT_PATH));

function runServer() {
    return new Promise((resolve, reject) => {
        app.listen(PORT, HOST, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            const host = HOST || 'localhost';
            console.log(`Listening on ${host}:${PORT}`);
        });
    });
}

if (require.main === module) {
    runServer();
}

//************************************STICKIE ENDPOINTS*****************************************/

//get all the stickies for now, this is for testing purposes atm
app.get('/stickies', passport.authenticate('basic', {session: false}), 
function(req, res) {
    Sticky.find(function(err, sticky) {
        if (err) {
            return res.status(500).json({message: 'Internal Server Error'});
        }

        return res.status(200).json(sticky);
    });
});
//Allows authorizied users to see their sticky notes
app.get('/users/:username/stickies', jsonParser, passport.authenticate('basic', {session: false}), function(req, res) {

    var routerUsername = req.params.username;
    var authenticatedUsername = req.user.username.toString();
    var authenticatedId = req.user._id.toString();

    if(routerUsername !== authenticatedUsername) {
         return res.status(422).json({
            "message": "Unauthorized"
         });
    }   

    Sticky.find({_user: authenticatedId}, function(err, stickies) {
        if(err) {
            return res.status(err);
        }
        return res.status(200).json(stickies);
    });
    
});
//should allow authorized users to delete their sticky
app.delete("/users/:username/stickies/:stickyId", jsonParser, passport.authenticate('basic', {session: false}), function(req, res) {
    //putting all requests in variables
            var username = req.params.username;
            var stickyId = req.params.stickyId;
            var authenticatedUsername = req.user.username.toString();

    //finds to allow user to delete sticky by stick:id
    Sticky.findByIdAndRemove({_id: stickyId}, function(err, sticky) {
            if(err) {
                return res.status(500);
            }
            if(username !== authenticatedUsername) {
                return res.status(401).json({message: "Unauthorized"});
            }e
        return res.status(200).json({});

    });
});
//Allows users to create the title for their sticky notes
app.post('/users/:username/stickies', jsonParser, passport.authenticate('basic', {session: false}), function(req, res) {
            var routeUsername = req.params.username;
            var stickyId = req.params.stickyId;
            var authenticatedUsername = req.user.username.toString();
            var authenticatedId = req.user._id.toString();
            var name = req.body.name;
            var content = req.body.content;

    Sticky.create({title: name, content: content, _user: authenticatedId}, function(err, sticky) {
        if(err) {
            return res.status(500);
        }
        if(routeUsername !== authenticatedUsername) {
            return res.status(401).json({message: "Unauthorized"});
        }

        return res.status(201).location("/users/" + authenticatedUsername + "/stickies/" + sticky._id).json({stickyId: sticky._id});
    });

});

//Allows user to edit a sticky note
app.put("/users/:username/stickies/:stickyId", jsonParser, passport.authenticate('basic', {session: false}), function(req, res) {
    //putting all requests in variables
            var routerUsername = req.params.username;
            var stickyId = req.params.stickyId;
            var name = req.body.name;
            var content = req.body.content;
            var authenticatedUsername = req.user.username.toString();
            var authenticatedId = req.user._id.toString();

    //finds stick-id and then allow user to edit sticky
    Sticky.findOne({_user: authenticatedId, _id: stickyId}, function(err, sticky) {
            
            if(routerUsername !== authenticatedUsername) {
                return res.status(401).json({message: "Unauthorized"});
            }   
            
            //check to see if name or content was changed
            if (name && !content){
                Sticky.findOneAndUpdate(
                    {_user: authenticatedId, _id: stickyId}, 
                    {content: sticky.content, name: name}, 
                    function(err, sticky) {
                        if(err) {
                            return res.status(500);
                        }
                        return res.status(201).json({message: "Succesfully saved"});
                        }
                );
            }
            if (content && !name){
                Sticky.findOneAndUpdate(
                    {_user: authenticatedId, _id: stickyId}, 
                    {name: sticky.name, content: content}, 
                    function(err, sticky) {
                        if(err) {
                            return res.status(500);
                        }
                    return res.status(201).json({message: "Succesfully saved"});
                });
            }

    });

});

/************************************USER ENDPOINTS***************************************/

//should list all users along with their passwords
app.get('/user', function(req,res){
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
app.get('/users/:username', jsonParser, passport.authenticate('basic', {session: false}), function(req, res) {
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
app.delete("/users/:username", jsonParser, passport.authenticate('basic', {session: false}), function(req, res) {
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
app.post('/createuser', jsonParser, function(req, res) {
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
app.put("/users/:username", jsonParser, passport.authenticate('basic', {
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


exports.app = app;
exports.runServer = runServer;