var fetch = require('isomorphic-fetch');

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
              dispatch(loginFail(data.error))
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

var POST_STICKY = 'POST_STICKY';
function postSticky(title, content) {
  console.log("I'm in")
  return (dispatch, getState) => {
    const hash = getState().hash;
    const currentUser = getState().currentUser;
    return fetch('/users/' + currentUser + '/stickies', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${hash}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: title,
        content: content
      })
    }).then(response => response.json().then(json => ({ json, response })))
      .then(({json, response}) => {
      if (response.ok === false) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      data => {
        var stickyId = data.stickyId
        console.log('this is data', data);
        dispatch(postStickySuccess(stickyId, title, content));
      },
      ({response, data}) => {
          dispatch(postStickyError(data.error));
          
          if(response.status == 401) {
              dispatch(loginFail(data.error))
          }
      }
    );
  };
}

//give us the title and content of the server side sticky
var POST_STICKY_SUCCESS = 'FETCH_STICKY_SUCCESS';
function postStickySuccess(stickyId, title, content) {
    return {
        type: POST_STICKY_SUCCESS,
        payloadStickyId: stickyId,
        payloadTitle: title,
        payloadContent: content
    };
}

var POST_STICKY_ERROR = 'FETCH_STICKY_ERROR';
function postStickyError(error) {
    return {
        type: POST_STICKIES_ERROR,
        payload: error
    }
};

var EDIT_STICKY = 'POST_STICKY';
function editSticky(titleOrContent) {
  console.log("I'm in edit")
  return (dispatch, getState) => {
    const hash = getState().hash;
    const currentUser = getState().currentUser;
    return fetch('/users/' + currentUser + '/stickies', {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${hash}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: title,
        content: content
      })
    });
    // .then(response => response.json().then(json => ({ json, response })))
    // .then(({json, response}) => {
    //     console.log(response);
    //   if (response.ok === false) {
    //     return Promise.reject(json);
    //   }
    //   return json;
    // })
    // .then(
    //   data => {
    //     dispatch(fetchStickiesSuccess(data));
    //   },
    //   ({response, data}) => {
    //       dispatch(fetchStickiesError(data.error));
          
    //       if(response.status == 401) {
    //           dispatch(loginFailure(data.error))
    //       }
    //   }
    // );
  };
}

//give us the title and content of the server side sticky
var EDIT_STICKIES_SUCCESS = 'EDIT_STICKY_SUCCESS';
function editStickySuccess(stickyArray) {
    return {
        type: POST_STICKIES_SUCCESS,
    };
}

var EDIT_STICKIES_ERROR = 'EDIT_STICKY_ERROR';
function editStickyError(error) {
    return {
        type: POST_STICKIES_ERROR,
    }
};

exports.LOGIN_REQUEST = LOGIN_REQUEST;
exports.loginRequest = loginRequest;

exports.LOGIN_SUCCESSFUL = LOGIN_SUCCESSFUL;
exports.loginSuccessful = loginSuccessful;

exports.LOGIN_FAIL = LOGIN_FAIL;
exports.loginFail = loginFail;

exports.FETCH_STICKIES = FETCH_STICKIES;
exports.fetchStickies = fetchStickies;

exports.FETCH_STICKIES_SUCCESS = FETCH_STICKIES_SUCCESS;
exports.fetchStickiesSuccess = fetchStickiesSuccess;

exports.FETCH_STICKIES_ERROR = FETCH_STICKIES_ERROR;
exports.fetchStickiesError = fetchStickiesError;

exports.POST_STICKY = POST_STICKY;
exports.postSticky = postSticky;

exports.POST_STICKY_SUCCESS = POST_STICKY_SUCCESS;
exports.postStickySuccess = postSticky;

exports.POST_STICKY_ERROR = POST_STICKY_ERROR;
exports.postStickyError = postSticky;

exports.EDIT_STICKY = EDIT_STICKY;
exports.editSticky = editSticky;

exports.DELETE_STICKY = DELETE_STICKY;
exports.deleteSticky = deleteSticky;