const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const { thunk } = require("redux-thunk");
const axios = require('axios');

// Initial state
const initialState = {
    loading: false,
    users: [],
    error: ""
};

// Action types
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// Action creators
const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST
});

const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users
});

const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: error
});

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ""
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            };
        default:
            return state;
    }
};

// Async action creator
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                const users = response.data.map((user) => user.id);
                dispatch(fetchUsersSuccess(users));
            })
            .catch((error) => {
                console.error("Error fetching users:", error.message);
                dispatch(fetchUsersFailure(error.message));
            });
    };
};

// Create store
const store = createStore(reducer, applyMiddleware(thunk ));

// Subscribe to store updates
store.subscribe(() => {
    console.log("Updated state:", store.getState());
});

// Dispatch the async action
store.dispatch(fetchUsers());
