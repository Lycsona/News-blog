'use strict';
var { Map, OrderedMap } = require('immutable');

var BASE_URL = 'http://homestead.app/';
module.exports = {
    BASE_URL: BASE_URL,

    LOGIN_URL: BASE_URL + 'api/v1/auth/login',
    SIGNUP_URL: BASE_URL + 'api/v1/auth/register',
    LOGOUT_URL: BASE_URL + 'api/v1/auth/logout',
    USER_URL: BASE_URL + 'api/v1/user/',

    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    USER_DATA: 'USER_DATA'
}