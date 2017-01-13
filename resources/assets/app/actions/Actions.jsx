'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';
import LOGIN_USER from '../constants/Constants';
import LOGOUT_USER from '../constants/Constants';
import USER_DATA from '../constants/Constants';
import {Router, Route} from 'react-router';
import Service from '../services/UserService';

export default {

    loginUser: (response) => {

        AppDispatcher.dispatch({
            actionType: LOGIN_USER,
            data: {
                id: response.id,
                user: response.user
            },
        });

        var url = '/profile/' + response.id;
        window.location.href = url;
    },

    logoutUser: () => {

        AppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });
        var url = '/logout';
        window.location.href = url;
    },

    userModel: (response) => {
        AppDispatcher.dispatch({
            actionType: USER_DATA,
            data: {
                user: response
            },
        });
    }
}