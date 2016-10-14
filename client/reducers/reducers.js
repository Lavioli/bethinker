var actions = require('../actions/actions');

var REGISTER_SUCCESS = actions.REGISTER_SUCCESS;
var REGISTER_ERROR = actions.REGISTER_ERROR;
var LOGIN_SUCCESSFUL = actions.LOGIN_SUCCESSFUL;
var LOGIN_FAIL = actions.LOGIN_FAIL;
var FETCH_STICKIES_SUCCESS = actions.FETCH_STICKIES_SUCCESS;
var FETCH_STICKIES_ERROR = actions.FETCH_STICKIES_ERROR;
var POST_STICKY_SUCCESS = actions.POST_STICKY_SUCCESS;
var POST_STICKY_ERROR = actions.POST_STICKY_ERROR;
var EDIT_STICKY_SUCCESS = actions.EDIT_STICKY_SUCCESS;
var EDIT_STICKY_ERROR = actions.EDIT_STICKY_ERROR;
var LOGOUT_USER = actions.LOGOUT_USER;

var initialState = {
    stickies: [],
    loginError: null,
    fetchGetError: null,
    fetchPostError: null,
    isAuthenticated: false,
    registerError: null,
    hash: null,
    currentUser: null
};

function stickyReducer(state, action) {
    var newState;
    
    state = state || initialState;
    
    switch(action.type) {

        case REGISTER_ERROR:
            newState = Object.assign({}, state, {
                registerError: true,
                error: action.payload
            });
            return newState;
        
        case LOGIN_SUCCESSFUL:
            newState = Object.assign({}, state, {
                isAuthenticated: true,
                hash: action.payloadHash,
                currentUser: action.payloadUsername
            });
            return newState;
            
        case LOGIN_FAIL:
            newState = Object.assign({}, state, {
                isAuthenticated: false,
                error: action.payload
            });
            return newState;
        
        case FETCH_STICKIES_SUCCESS:
            newState = Object.assign({}, state, {
                stickies: action.payload,
                fetchGetError: null
            });
            console.log(newState);
            return newState;
            
        case FETCH_STICKIES_ERROR:
            newState = Object.assign({}, state, {
                fetchGetError: action.payload
            });
            return newState;
            
        case POST_STICKY_SUCCESS:
            newState = Object.assign({}, state, {
                stickies: state.stickies.concat({
                    stickyId: action.payloadStickyId, 
                    title: action.payloadTitle, 
                    content: action.payloadContent
                })
            })
            console.log(newState);
            return newState;
        
        case POST_STICKY_ERROR:
            newState = Object.assign({}, state, {
                fetchPostError: action.payload
            });
            return newState;
        
        case EDIT_STICKY_SUCCESS:
            newState = Object.assign({}, state, {
                stickes: 'yes'
            })
            return newState;
            
        case LOGOUT_USER:
            newState = Object.assign({}, state, {
                    stickies: [],
                    loginError: null,
                    fetchGetError: null,
                    fetchPostError: null,
                    isAuthenticated: false,
                    registerError: null,
                    hash: null,
                    currentUser: null
            });
            return newState;
            
        default:
            return state;
    }
}

export default stickyReducer;