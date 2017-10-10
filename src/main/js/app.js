import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Index from 'js/index';

import 'styles/main.scss';

function userReducer(state = {}, action) {
    switch (action.type) {
        case 'AUTH_USER':
            state.authed = true;
            state.userData = action.userData;
            return state;
        case 'UNAUTH_USER':
            state.authed = false;
            return state;
        case 'UPDATE_USER':
            state.userData = action.userData;
            return state;
        default:
            return state;
    }
}

const reducers = {
	form: formReducer,
    user: userReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer, {user: {authed: true}});

const mountNode = document.querySelector('#main');
ReactDOM.render(<Provider store={store}><Index /></Provider>, mountNode);