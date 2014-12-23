var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NewsConstants = require('../constants/NewsConstants');
var _ = require('underscore');

var currentSource = "news";
function changeSource() {
    if (currentSource === "news") {
        currentSource = "twitts";
    } else {
        currentSource = "news";
    }
}

var NavbarStore = _.extend({}, EventEmitter.prototype, {
    getSource: function () {
        return currentSource;
    },
    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case NewsConstants.CHANGE_SOURCE:
            changeSource();
            break;
        default:
            return true;
    }

    NavbarStore.emitChange();
});

module.exports = NavbarStore;
