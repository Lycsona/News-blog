'use strict';

function Store() {
    this._changeListeners = [];
}

Store.prototype.notifyChange = function(param) {
    var listeners = this._changeListeners;
    for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i](param);
    }
};

Store.prototype.addChangeListener = function(listener) {
    this._changeListeners.push(listener);
};

Store.prototype.removeChangeListener = function(listener) {
    var listeners = this._changeListeners;
    var i = listeners.indexOf(listener);

    if (i > -1) {
        listeners.splice(i, 1);
    }
};

module.exports = {
    newStore: function() {
        return new Store();
    },
};
