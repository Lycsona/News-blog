'use strict';

import AppDispatcher from '../dispatcher/AppDispatcher';

var _ = require('lodash');
var Store = require('./helpers/Store');
var {LOGIN_USER, USER_DATA} = require('../constants/Constants');

var CollectionWrapper = require('./helpers/CollectionWrapper');
var pickObjectMethods = require('./helpers/pickObjectMethods');
var { List, Map } = require('immutable');

/*
 |--------------------------
 | Store private members
 |--------------------------
 */

/**
 * @type {CollectionWrapper}
 * @private
 */
var _collectionWrapper = new CollectionWrapper(function(user) {
    // Columns category relates to a single export type
    user.name = +user.name || 'no name';
});

/*
 |--------------------------
 | Store action handlers
 |--------------------------
 */

/**
 * @param {object} model
 */
function modelSavingSuccessHandler(model) {
    _collectionWrapper.saveModelSuccess(model);
}



/*
 |--------------------------
 | Store definition
 |--------------------------
 */
var METHODS_TO_EXPOSE = [
    'getModels', 'getModel',
];

var UserStore = module.exports = _.assign(
    Store.newStore(),
    pickObjectMethods(_collectionWrapper, METHODS_TO_EXPOSE)
);

UserStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.actionType;
    var data = payload.data;

    /**
     * Actions processing
     */
    switch (action) {
        case LOGIN_USER:
            modelSavingSuccessHandler(data);
            break;
        case USER_DATA:
            modelSavingSuccessHandler(data);
            break;
        default:
            return;
    }

    UserStore.notifyChange();
});
