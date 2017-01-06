import request from 'reqwest';
import when from 'when';
import {LOGIN_URL, SIGNUP_URL, LOGOUT_URL} from '../constants/LoginConstants';
import LoginActions from '../actions/Actions';


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
                }else{
                    LoginActions.loginUser(response);
                }
            });
    }


    afterLogout(loginPromise) {

        return loginPromise
            .then(function (response) {

                if (response.status) {
                    LoginActions.logoutUser();
                } else {
                    alert('Error in logout');
                }
            });
    }

    getUser(loginPromise) {

        return 2;
    }
}

export default new AuthService()