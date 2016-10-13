var actions = require('../actions/actions');

var LOGIN_SUCCESSFUL = actions.LOGIN_SUCCESSFUL;
var LOGIN_FAIL = actions.LOGIN_FAIL;
var FETCH_STICKIES_SUCCESS = actions.FETCH_STICKIES_SUCCESS;
var FETCH_STICKIES_ERROR = actions.FETCH_STICKIES_ERROR;
var POST_STICKY_SUCCESS = actions.POST_STICKY_SUCCESS;
var POST_STICKY_ERROR = actions.POST_STICKY_ERROR;

var initialState = {
    stickies: [],
    loginError: null,
    fetchGetError: null,
    fetchPostError: null,
    isAuthenticated: false,
    hash: null,
    currentUser: null
};

function stickyReducer(state, action) {
    var newState;
    
    state = state || initialState;
    
    switch(action.type) {
 
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
             console.log('THIS IS NEWSTATE', newState)

            return newState;
        
        case POST_STICKY_ERROR:
            newState = Object.assign({}, state, {
                fetchPostError: action.payload
            });
            return newState;
        
        default:
            return state;
    }
}

export default stickyReducer;