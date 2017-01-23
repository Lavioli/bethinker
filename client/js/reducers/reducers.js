import actions from '../actions/actions';

const REGISTER_SUCCESS = actions.REGISTER_SUCCESS,
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

const initialState = {
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

        case LOGOUT_USER_NOW:
            newState = Object.assign({}, state, {
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
            return newState;

        case LOGOUT_USER_ERROR:
            newState = Object.assign({}, state, {
                    logoutError: null
            })
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
            return newState;

        case POST_STICKY_ERROR:
            newState = Object.assign({}, state, {
                fetchPostError: action.payload
            });
            return newState;

        case EDIT_STICKY_SUCCESS:
            return newState;

        case EDIT_STICKY_ERROR:
            newState = Object.assign({}, state, {
                editPostError: action.payload
            });
            return newState;

        case DELETE_STICKY_SUCCESS:
            return newState;

        case DELETE_STICKY_ERROR:
            newState = Object.assign({}, state, {
                deletePostError: action.payload
            });
            return newState;

        default:
            return state;
    }
}

export default stickyReducer;
