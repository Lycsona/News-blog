import AppDispatcher from '../dispatcher/AppDispatcher';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';

export default {
    loginUser: (response) => {

        AppDispatcher.dispatch({
            actionType: LOGIN_USER
        });

        Router.browserHistory.push('/profile/' + response.id);
    },

    logoutUser: () => {

        AppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });

        Router.browserHistory.push('/logout');

    }
}