var actions = require('../actions/actions');

var FETCH_STICKIES_SUCCESS = actions.FETCH_STICKIES_SUCCESS;
var FETCH_STICKIES_ERROR = actions.FETCH_STICKIES_ERROR;
var LOGIN_SUCCESSFUL = actions.LOGIN_SUCCESSFUL;
var LOGIN_FAIL = actions.LOGIN_FAIL;

var initialState = {
    stickies: [],
    loginError: null,
    fetchGetError: null,
    isAuthenticated: false,
    hash: null,
    username: null
};

function stickyReducer(state, action) {
    var newState;
    
    state = state || initialState;
    
    switch(action.type) {
        
        case FETCH_STICKIES_SUCCESS:
            newState = Object.assign({}, state, {
                stickies: action.payload,
                fetchGetError: null
            });
            return newState;
            
        case FETCH_STICKIES_ERROR:
            newState = Object.assign({}, state, {
                error: action.payload
            });
            return newState;
            
        case LOGIN_SUCCESSFUL:
            newState = Object.assign({}, state, {
                authenticated: true,
                hash: action.payloadHash,
                user: action.payloadUsername
            });
            return newState;
            
        case LOGIN_FAIL:
            newState = Object.assign({}, state, {
                isAuthenticated: false,
                error: action.payload
            });
            return newState;
        
        default:
            return state;
    }
}

export default stickyReducer;