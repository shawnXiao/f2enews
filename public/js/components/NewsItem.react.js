var React = require('react');

var NewsItem = React.createClass({
    render: function () {
        var newsItem = this.props.newsItem;
        return (
            <li key={newsItem}>
                <a href={newsItem.href} target="_blank">{this.props.index + 1}.  {newsItem.text}</a>
            </li>
        )
    }
});

module.exports = NewsItem;
