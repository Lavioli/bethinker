var express = require('express'),
    passport = require('passport');

var Sticky = require('../models/sticky');

var stickyRouter = express.Router();

//************************************STICKIE ENDPOINTS*****************************************/

//get all the stickies for now, this is for testing purposes atm
// app.get('/stickies', passport.authenticate('basic', {session: false}),
// function(req, res) {
//     Sticky.find(function(err, sticky) {
//         if (err) {
//             return res.status(500).json({message: 'Internal Server Error'});
//         }

//         return res.status(200).json(sticky);
//     });
// });
//Allows authorizied users to see their sticky notes
stickyRouter.get('/users/:username/stickies', passport.authenticate('basic', {session: false}), function(req, res) {

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
stickyRouter.delete("/users/:username/stickies/:stickyId", passport.authenticate('basic', {session: false}), function(req, res) {
    //putting all requests in variables
            var username = req.params.username;
            var stickyId = req.params.stickyId;
            var authenticatedUsername = req.user.username.toString();

    //finds to allow user to delete sticky by stick:id
    Sticky.findByIdAndRemove({_id: stickyId}, function(err, sticky) {
            if(err) {
                return res.sendStatus(500);
            }
            if(username !== authenticatedUsername) {
                return res.status(401).json({message: "Unauthorized"});
            }
        return res.status(200).json({});

    });
});
//Allows users to create the title for their sticky notes
stickyRouter.post('/users/:username/stickies', passport.authenticate('basic', {session: false}), function(req, res) {
            var routeUsername = req.params.username;
            var stickyId = req.params.stickyId;
            var authenticatedUsername = req.user.username.toString();
            var authenticatedId = req.user._id.toString();
            var title = req.body.title;
            var content = req.body.content;

    Sticky.create({title: title, content: content, _user: authenticatedId}, function(err, sticky) {
        if(err) {
            return res.sendStatus(500);
        }
        if(routeUsername !== authenticatedUsername) {
            return res.status(401).json({message: "Unauthorized"});
        }

        return res.status(201).location("/users/" + authenticatedUsername + "/stickies/" + sticky._id).json({stickyId: sticky._id});
    });

});

//Allows user to edit a sticky note
stickyRouter.put("/users/:username/stickies/:stickyId", passport.authenticate('basic', {session: false}), function(req, res) {
    //putting all requests in variables
            var routerUsername = req.params.username;
            var stickyId = req.params.stickyId;
            var title = req.body.title;
            var content = req.body.content;
            var authenticatedUsername = req.user.username.toString();
            var authenticatedId = req.user._id.toString();

    //finds stick-id and then allow user to edit sticky
    Sticky.findOne({_user: authenticatedId, _id: stickyId}, function(err, sticky) {

            if(routerUsername !== authenticatedUsername) {

                return res.status(401).json({message: "Unauthorized"});
            }

            //check to see if title or content was changed
            if (title && content){

                Sticky.findOneAndUpdate(
                    {_user: authenticatedId, _id: stickyId},
                    {content: content, title: title},
                    function(err, sticky) {

                        if(err) {

                            return res.sendStatus(500);
                        }

                        return res.status(200).json({message: "Succesfully saved"});
                        }
                );
            }
            // if (content && !title){
            //     Sticky.findOneAndUpdate(
            //         {_user: authenticatedId, _id: stickyId},
            //         {title: sticky.title, content: content},
            //         function(err, sticky) {
            //             if(err) {
            //                 return res.sendStatus(500);
            //             }
            //         return res.status(201).json({message: "Succesfully saved"});
            //     });
            // }

    });

});

module.exports = stickyRouter;
