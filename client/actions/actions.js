var fetch = require('isomorphic-fetch');

var ADD_STICKY = 'ADD_STICKY';
function addSticky(title, content) {
    return {
        type: ADD_STICKY,
        title: title,
        content: content
    };
}

var EDIT_STICKY = 'EDIT_STICKY';
function editSticky(title, content) {
    return {
        type: EDIT_STICKY,
        title: title,
        content: content
    };
}

var DELETE_STICKY = 'DELETE_STICKY';
function deleteSticky() {
    type: DELETE_STICKY
}

var LOGIN_REQUEST = 'LOGIN_REQUEST';
var loginRequest = function (username, password) {
  return (dispatch) => {
    const hash = new Buffer(`${username}:${password}`).toString('base64')
    return fetch('/users/' + username, {
      headers: {
        'Authorization': `Basic ${hash}`
      }
    })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({json, response}) => {
      if (response.ok === false) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      data => {
        console.log('THIS IS THE DATA:' , data)
        dispatch(loginSuccessful(hash, data.username));
      },
      (data) => dispatch(loginFail(data.error || 'Incorrect username and/or password. Please try again.'))
    );
  };
};

var LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
function loginSuccessful(hash, username) {
    return {
    type: LOGIN_SUCCESSFUL,
    payloadHash: hash,
    payloadUsername: username
    };
}

var LOGIN_FAIL = 'LOGIN_FAIL';
var loginFail = function(error) {
    return {
    type: LOGIN_FAIL,
    payload: error
    };
};

var FETCH_STICKIES = 'FETCH_STICKIES';
function fetchStickies() {
  return (dispatch, getState) => {
    const hash = getState().hash;
    return fetch('/stickies', {
      headers: {
        'Authorization': `Basic ${hash}`
      }
    })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({json, response}) => {
        console.log(response);
      if (response.ok === false) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      data => {
        dispatch(fetchStickiesSuccess(data));
      },
      ({response, data}) => {
          dispatch(fetchStickiesError(data.error));
          
          if(response.status == 401) {
              dispatch(loginFailure(data.error))
          }
      }
    );
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

exports.LOGIN_SUCCESSFUL = LOGIN_SUCCESSFUL;
exports.loginSuccessful = loginSuccessful;

exports.LOGIN_FAIL = LOGIN_FAIL;
exports.loginFail = loginFail;

exports.LOGIN_REQUEST = LOGIN_REQUEST;
exports.loginRequest = loginRequest;

exports.ADD_STICKY = ADD_STICKY;
exports.addSticky = addSticky;

exports.EDIT_STICKY = EDIT_STICKY;
exports.editSticky = editSticky;

exports.DELETE_STICKY = DELETE_STICKY;
exports.deleteSticky = deleteSticky;