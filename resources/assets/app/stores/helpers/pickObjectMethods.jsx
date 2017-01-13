'use strict';

var _ = require('lodash');

/**
 * The function pick the methods from the specified object
 * All the retrieved methods have context bound to the specified object.
 *
 * @param {object} obj
 * @param {Array} listOfMethods
 * @param {boolean} asArray
 * @returns {boolean}
 */
module.exports = function pickObjectMethods(obj, listOfMethods, asArray = false) {
    if (!obj || !listOfMethods) {
        return asArray ? [] : {};
    }

    var methods = {};

    _.each(listOfMethods, function(methodName) {
        methods[methodName] = _.bind(obj[methodName], obj);
    });

    return asArray ? _.values(methods) : methods;
};
