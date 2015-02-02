var AppDispatcher = require('../dispatcher/AppDispatcher');
var NewsConstants = require('../constants/NewsConstants');
var ClassicsConstants = require('../constants/ClassicsConstants');

var NewsActions = {
    receiveNews: function (data) {
        AppDispatcher.handleAction({
            actionType: NewsConstants.RECEIVE_DATA,
            data: data
        });
    },
    receiveClassics: function (data) {
        AppDispatcher.handleAction({
            actionType: ClassicsConstants.RECEIVE_DATA,
            data: data
        });
    },
    receiveTwitts: function (data) {
        AppDispatcher.handleAction({
            actionType: NewsConstants.RECEIVE_TWITTS_DATA,
            data: data
        });
    },
    receiveUserInfo: function (data) {
        AppDispatcher.handleAction({
            actionType: NewsConstants.RECEIVE_USER_DATA,
            data: data
        });
    },
    changeSource: function (source) {
        AppDispatcher.handleAction({
            actionType: NewsConstants.CHANGE_SOURCE,
            source: source
        });
    },
    getMoreTwitts: function (start) {
        AppDispatcher.handleAction({
            actionType: NewsConstants.MORE_DATA,
            start: start
        });
    },
    getMoreNews: function (start) {
        AppDispatcher.handleAction({
            actionType: NewsConstants.MORE_TWITTS_DATA
        });
    }
}
module.exports = NewsActions;
