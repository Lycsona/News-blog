import request from 'reqwest';
import when from 'when';
import {LOGIN_URL, SIGNUP_URL, LOGOUT_URL, USER_URL} from '../constants/Constants';
import Actions from '../actions/Actions';

const CSRF_TOKEN = window.CSRF_TOKEN || '';

class AuthService {

    login(name, password, email, _token) {

        return this.handleAuth(when(request({
            url: LOGIN_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                name, password, email, _token
            },
            headers: {
                'X-CSRF-Token': _token
            }
        })));
    }

    logout() {
        return this.afterLogout(when(request({
            url: LOGOUT_URL,
            method: 'GET',
            crossOrigin: true,
            type: 'json'
        })));
    }

    register(name, password, email, _token, extra) {
        return this.handleAuth(when(request({
            url: SIGNUP_URL,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                name, password, email, _token, extra
            },
            headers: {
                'X-CSRF-TOKEN': _token
            }
        })));
    }

    handleAuth(loginPromise) {

        return loginPromise
            .then(function (response) {
                if (response.error) {
                    alert(response.error.email);
                } else {
                    Actions.loginUser(response);
                }
            });
    }

    afterLogout(loginPromise) {

        return loginPromise
            .then(function (response) {
                if (response.status) {
                    Actions.logoutUser();
                } else {
                    alert('Error in logout');
                }
            });
    }

    getUser(id) {
        this.handleUserModel(when(request({
            url: USER_URL + id,
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                id
            },
            headers: {
                'X-CSRF-TOKEN': CSRF_TOKEN
            }
        })));
    }

    handleUserModel(promise) {
        return promise
            .then(function (response) {
                if (response.user) {
                    Actions.userModel(response.user);
                } else {
                    alert('Error in getting user');
                }
            });
    }

}

export default new AuthService()