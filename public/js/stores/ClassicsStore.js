var AppDispatcher = require('../dispatcher/AppDispatcher');
var NewsAPI = require('../utils/newsAPI');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var _classics = [];

var ClassicsStore = _.extend({}, EventEmitter.prototype, {
    getClassics: function () {
        return _classics;
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
        case NewsConstants.RECEIVE_DATA:
            loadNews(action.data);
            break;
        case NewsConstants.MORE_DATA:
            getMoreNews();
            break;
        default:
            return true;
    }

    NewsStore.emitChange();
})
module.exports = NewsStore;

