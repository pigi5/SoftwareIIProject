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
            return {authed: true, userData: action.userData, booking:{}};
        case 'UNAUTH_USER':
            return {authed: false};
        case 'UPDATE_USER':
            return {authed: true, userData: action.userData, booking:{}};
        case 'START_BOOKING':
            var cloneState = JSON.parse(JSON.stringify(state));
            cloneState.booking = action.bookingData;
            return cloneState;
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
        {/*
            user: {
                authed: true,
                userData: {
                    name: 'Test User',
                    email: 'test@test.com',
                    username: 'testuser2',
                    password: 'password',
                    zipCode: 11111,
                    pets: [
                        {
                            name: 'Fido',
                            type: 'Dog',
                            description: 'Good Boy'
                        },
                        {
                            name: 'Mittens',
                            type: 'Cat',
                            description: 'Good Girl'
                        }
                    ],
                    availability: [],
                    rating: null
                },
                booking: {}
            }*/
        }
);

const mountNode = document.querySelector('#main');
ReactDOM.render(<Provider store={store}><Index /></Provider>, mountNode);