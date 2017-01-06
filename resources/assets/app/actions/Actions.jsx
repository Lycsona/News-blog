'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import {LOGIN_USER, LOGOUT_USER, USER_DATA } from '../constants/LoginConstants';
import {Router, Route} from 'react-router';
import AuthService from '../services/AuthService';

export default {

    loginUser: (response) => {

        AppDispatcher.dispatch({
            type: LOGIN_USER,
            data: {
                id: response.id,
                name: response.username
            },
        });

        var url = '/profile/' + response.id;
        window.location.href = url;
    },

    logoutUser: () => {

        AppDispatcher.dispatch({
            type: LOGOUT_USER
        });
        var url = '/logout';
        window.location.href = url;
    },

    getUser: (id) => {
        AppDispatcher.dispatch({
            type: USER_DATA,
            data: {
                id: id
            },
        });
    }
}