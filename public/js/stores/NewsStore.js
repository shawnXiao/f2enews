var AppDispatcher = require('../dispatcher/AppDispatcher');
var NewsAPI = require('../utils/newsAPI');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var NewsConstants = require('../constants/NewsConstants');

var _news = [];

function loadNews(data) {
    _news = _news.concat(data);
}

function getMoreNews(start) {
    console.log("dsfasdfasdf");
    NewsAPI.getNewsData(_news.length);
}

var NewsStore = _.extend({}, EventEmitter.prototype, {
    getNews: function () {
        return _news;
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
