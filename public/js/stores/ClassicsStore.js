var AppDispatcher = require('../dispatcher/AppDispatcher');
var NewsAPI = require('../utils/newsAPI');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var NewsConstants = require('../constants/NewsConstants');

var _classics = [];

function loadClassics(data) {
    _classics = data;
}

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
        case NewsConstants.RECEIVE_Classics_DATA:
            debugger;
            console.log("action", action);
            loadClassics(action.data);
            break;
        default:
            return true;
    }

    ClassicsStore.emitChange();
})
module.exports = ClassicsStore;;

