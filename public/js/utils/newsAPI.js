var shawn = require("./shawn");
var NewsActions = require('../actions/NewsActions');
module.exports = {
    getNewsData: function (start) {
        shawn.get('/api/news/start/' + (start || 0) , NewsActions.receiveNews);
    },
    getClassics: function () {
        shawn.get('/api/classics', NewsActions.receiveClassic);
    },
    oauthGithub: function (code) {
        shawn.get('api/oauth/github/' + code, NewsActions.receiveUserInfo);
    },
    getTwittsData: function (start) {
        shawn.get('/api/twitts/start/' + (start || 0) , NewsActions.receiveTwitts);
    }
};
