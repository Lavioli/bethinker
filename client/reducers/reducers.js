var actions = require('../actions/actions');

var FETCH_STICKIES_SUCCESS = actions.FETCH_STICKIES_SUCCESS;
var FETCH_STICKIES_ERROR = actions.FETCH_STICKIES_ERROR;

var initialState = {
    stickies: [],
    fetchGetError: null
};

function stickyReducer(state, action) {
    var newState;
    
    state = state || initialState;
    
    switch(action.type) {
        
        case FETCH_STICKIES_SUCCESS:
            var newError = state.error;
            newState = Object.assign({}, state, {
                stickies: action.payload
            });
            return newState;
            
        case FETCH_STICKIES_ERROR:
            newState = Object.assign({}, state, {
                error: action.payload
            })
            return newState;
            
        default:
            return state;
    }
}