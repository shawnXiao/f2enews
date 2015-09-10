var AppDispatcher = require('../dispatcher/AppDispatcher');
var TwittsAPI = require('../utils/newsAPI');
var EventEmitter = require('events').EventEmitter;
var NewsConstants = require('../constants/NewsConstants');
var _ = require('underscore');

var _twitts = [];

function loadTwitts(data) {
    _twitts = _twitts.concat(data);
}

function getMoreTwitts() {
    TwittsAPI.getNewsData(_twitts.length);
}

var TwittsStore = _.extend({}, EventEmitter.prototype, {
    getTwitts: function () {
        return _twitts;
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
    var text;

    switch (action.actionType) {
        case NewsConstants.RECEIVE_TWITTS_DATA:
            loadTwitts(action.data);
            break;
        case NewsConstants.MORE_TWITTS_DATA:
            getMoreTwitts();
            break;
        default:
            return true;
    }

    TwittsStore.emitChange();
})
module.exports = TwittsStore;
