var actions = require('../actions/actions');

var REGISTER_SUCCESS = actions.REGISTER_SUCCESS,
    REGISTER_ERROR = actions.REGISTER_ERROR,
    LOGIN_SUCCESSFUL = actions.LOGIN_SUCCESSFUL,
    LOGIN_FAIL = actions.LOGIN_FAIL,
    FETCH_STICKIES_SUCCESS = actions.FETCH_STICKIES_SUCCESS,
    FETCH_STICKIES_ERROR = actions.FETCH_STICKIES_ERROR,
    POST_STICKY_SUCCESS = actions.POST_STICKY_SUCCESS,
    POST_STICKY_ERROR = actions.POST_STICKY_ERROR,
    EDIT_STICKY_SUCCESS = actions.EDIT_STICKY_SUCCESS,
    EDIT_STICKY_ERROR = actions.EDIT_STICKY_ERROR,
    DELETE_STICKY_SUCCESS = actions.EDIT_STICKY_ERROR,
    DELETE_STICKY_ERROR = actions.EDIT_STICKY_ERROR,
    LOGOUT_USER_NOW = actions.LOGOUT_USER_NOW,
    LOGOUT_USER_ERROR = actions.LOGOUT_USER_ERROR;

var initialState = {
    stickies: [],
    loginError: null,
    fetchGetError: null,
    fetchPostError: null,
    editPostError: null,
    deletePostError: null,
    isAuthenticated: false,
    registerError: null,
    hash: null,
    currentUser: null
};

function stickyReducer(state, action) {
    state = state || initialState;

    switch(action.type) {
        case REGISTER_ERROR:
            console.log(action.payload);
            return Object.assign({}, state, {
                registerError: action.payload
            });

        case LOGIN_SUCCESSFUL:
            return Object.assign({}, state, {
                isAuthenticated: true,
                hash: action.payloadHash,
                currentUser: action.payloadUsername,
                loginError: null,
                registerError: null
            });

        case LOGIN_FAIL:
            return Object.assign({}, state, {
                isAuthenticated: false,
                loginError: action.payload
            });

        case LOGOUT_USER_NOW:
            return Object.assign({}, state, {
                stickies: [],
                loginError: null,
                logoutError: null,
                fetchGetError: null,
                fetchPostError: null,
                isAuthenticated: false,
                registerError: null,
                hash: null,
                currentUser: null,
                previousUser: action.payload
            });

        case LOGOUT_USER_ERROR:
            return Object.assign({}, state, {
                    logoutError: null
            })

        case FETCH_STICKIES_SUCCESS:
            return Object.assign({}, state, {
                stickies: action.payload,
                fetchGetError: null
            });

        case FETCH_STICKIES_ERROR:
            return Object.assign({}, state, {
                fetchGetError: action.payload
            });

        case POST_STICKY_SUCCESS:
            return Object.assign({}, state, {
                stickies: state.stickies.concat({
                stickyId: action.payloadStickyId,
                title: action.payloadTitle,
                content: action.payloadContent
                })
            });

        case POST_STICKY_ERROR:
            return Object.assign({}, state, {
                fetchPostError: action.payload
            });

        case EDIT_STICKY_ERROR:
            return Object.assign({}, state, {
                editPostError: action.payload
            });

        case DELETE_STICKY_ERROR:
            return Object.assign({}, state, {
                deletePostError: action.payload
            });

        default:
            return state;
    }
}

exports.stickyReducer = stickyReducer;
