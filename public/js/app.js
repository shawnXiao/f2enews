window.React = require('react');
var NewsAPI = require('./utils/newsAPI');
var NewsApp = require('./components/NewsApp.react');

NewsAPI.getNewsData();
NewsAPI.getTwittsData();
NewsAPI.getClassics();

React.render(
    <NewsApp />,
    document.getElementById('f2enews')
);
