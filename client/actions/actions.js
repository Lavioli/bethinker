var fetch = require('isomorphic-fetch');

function idPasswordToHeader(username,password) {
    var authString = btoa(username + ':' + password);
    
    var authValue = "Basic" + authString
    
    var headers = new Headers();
    headers.append('Authorization', authValue);
    var request = new Request('/stickies', {headers: headers});
    return request;
}

var ADD_STICKY = 'ADD_STICKY';
function addSticky(title, content) {
    return {
        type: ADD_STICKY,
        title: title,
        content: content
    }
}

var EDIT_STICKY = 'EDIT_STICKY';
function editSticky(title, content) {
    return {
        type: EDIT_STICKY,
        title: title,
        content: content
    }
    
}

var DELETE_STICKY = 'DELETE_STICKY';
function deleteSticky() {
    type: DELETE_STICKY
}

//
var FETCH_STICKIES_REQUEST = 'FETCH_STICKIES_REQUEST';
var fetchStickiesRequest = function() {
    return {
        type: FETCH_STICKIES_REQUEST
    }
};



var FETCH_STICKIES = 'FETCH_STICKIES';
function fetchStickies() {
    return function(dispatch) {

        var endpoint = '/stickies';
        fetch(idPasswordToHeader('lavie','password'))
            .then(function(response) {
                if(response.status < 200 || response.status >= 300) {
                    var error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
                return response.json();
            })
            .then(function(data) {
                dispatch(fetchStickiesSuccess(data));
            })
            .catch(function(error) {
                dispatch(fetchStickiesError(error));
            });
    };
}


//give us the title and content of the server side sticky
var FETCH_STICKIES_SUCCESS = 'FETCH_STICKIES_SUCCESS';
function fetchStickiesSuccess(stickyArray) {
    return {
        type: FETCH_STICKIES_SUCCESS,
        payload: stickyArray
    };
}

var FETCH_STICKIES_ERROR = 'FETCH_STICKIES_ERROR';
function fetchStickiesError(error) {
    return {
        type: FETCH_STICKIES_ERROR,
        payload: error
    }
};

exports.FETCH_STICKIES = FETCH_STICKIES;
exports.fetchStickies = fetchStickies;

exports.FETCH_STICKIES_SUCCESS = FETCH_STICKIES_SUCCESS;
exports.fetchStickiesSuccess = fetchStickiesSuccess;

exports.FETCH_STICKIES_ERROR = FETCH_STICKIES_ERROR;
exports.fetchStickiesError = fetchStickiesError;

exports.ADD_STICKY = ADD_STICKY;
exports.addSticky = addSticky;

exports.EDIT_STICKY = EDIT_STICKY;
exports.editSticky = editSticky;

exports.DELETE_STICKY = DELETE_STICKY;
exports.deleteSticky = deleteSticky;