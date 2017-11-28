import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Index from 'js/index';
import axios from 'axios';

import 'styles/main.scss';

function userReducer(state = {}, action) {
    // Must return NEW state here, instead of altering previous
    switch (action.type) {
        case 'AUTH_USER':
            return {authed: true, userData: action.userData, booking:{}};
        case 'UNAUTH_USER':
            return {authed: false};
        case 'UPDATE_USER':
            return Object.assign({}, state, {userData: Object.assign({}, state.userData, action.userData)});
        case 'UPDATE_BOOKING':
            return Object.assign({}, state, {booking: action.bookingData});
        default:
            return state;
    }
}

const reducers = {
	form: formReducer,
    user: userReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer, {user: {authed: false}});

const mountNode = document.querySelector('#main');

axios.get('/api/users/refresh')
    .then((response) => {
        console.log('dispatched');
        store.dispatch({
            type: 'AUTH_USER',
            userData: response.data
        });

        ReactDOM.render(<Provider store={store}><Index /></Provider>, mountNode);
    })
    .catch((response) => {
        ReactDOM.render(<Provider store={store}><Index /></Provider>, mountNode);
    });