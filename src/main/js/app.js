import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Index from 'js/index';

import 'styles/main.scss';

function userReducer(state = {}, action) {
    // Must return NEW state here, instead of altering previous
    switch (action.type) {
        case 'AUTH_USER':
            return {authed: true, userData: action.userData};
        case 'UNAUTH_USER':
            return {authed: false};
        case 'UPDATE_USER':
            return {authed: true, userData: action.userData};
        default:
            return state;
    }
}

const reducers = {
	form: formReducer,
    user: userReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer, 
        {
            user: {
                authed: false,
                userData: {}
            }
        }
);

const mountNode = document.querySelector('#main');
ReactDOM.render(<Provider store={store}><Index /></Provider>, mountNode);