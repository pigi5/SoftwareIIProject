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
const store = createStore(reducer, 
        {
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
                    rating: null,
                    ownerNotifications: [
                        {
                            title: 'Title 1',
                            message: 'Hello',
                            notificationDate: 1000000020000,
                            isRead: false,
                            booking: {}
                        },
                        {
                            title: 'Title 2',
                            message: 'Goodbye',
                            notificationDate: 1000000010000,
                            isRead: false,
                            booking: {}
                        },
                        {
                            title: 'Title 3',
                            message: 'Hello again',
                            notificationDate: 1000000000000,
                            isRead: true,
                            booking: {}
                        }
                        
                    ],
                    sitterNotifications: [
                        {
                            title: 'Title 4',
                            message: 'Hello',
                            notificationDate: 1000000050000,
                            isRead: false,
                            booking: {}
                        },
                        {
                            title: 'Title 5',
                            message: 'Goodbye',
                            notificationDate: 1000000040000,
                            isRead: false,
                            booking: {}
                        },
                        {
                            title: 'Title 6',
                            message: 'Hello again',
                            notificationDate: 1000000030000,
                            isRead: true,
                            booking: {}
                        }
                        
                    ]
                },
                booking: {}
            }
        }
);

const mountNode = document.querySelector('#main');
ReactDOM.render(<Provider store={store}><Index /></Provider>, mountNode);