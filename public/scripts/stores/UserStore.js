var AppDispatcher = require('../dispatcher/AppDispatcher');
var NewsAPI = require('../utils/newsAPI');
var EventEmitter = require('events').EventEmitter;
var NewsConstants = require('../constants/NewsConstants');
var _ = require('underscore');

var _userInfo = {};

function oauthGithub() {

}

function getUserInfo() {

}

var UserStore = _.extend({}, EventEmitter.prototype, {
    getUserInfo: function () {
        return _userInfo;
    },
    oauthGithub: function () {
        NewsAPI.oauthGithub(code);
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
        case NewsConstants.RECEIVE_USER_DATA:
            oauthGithub(action.code);
            break;
        default:
            return true;
    }

    UserStore.emitChange();
});

module.exports = UserStore;
