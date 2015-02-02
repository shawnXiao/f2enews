var React = require('react');
var NewsActions = require('../actions/NewsActions');
var Button = require('./Button.react');

var NewsItem = React.createClass({
    render: function () {
        var newsItem = this.props.newsItem;
        return (
            <li key={newsItem} id={this.props.index}>
                <a href={newsItem.href} target="_blank">{this.props.index + 1}.  {newsItem.title}</a>
            </li>
        )
    }
});


var Classics = React.createClass({
    render: function () {
        var self = this;
        var news = this.props.news;
        var newsRows = [];
        news.forEach(function (newsItem, index) {
            newsRows.push(<NewsItem newsItem={newsItem} index={index} />)
        })
        return (
            <div>
                <ul>
                    {newsRows}
                </ul>
            </div>
        )
    }
});

module.exports = Classics;
