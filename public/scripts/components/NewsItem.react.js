var React = require('react');

var NewsItem = React.createClass({
    render: function () {
        var newsItem = this.props.newsItem;
        var href = "/api/proxy?url=" + encodeURIComponent(newsItem.href);
        return (
            <li key={newsItem} id={this.props.index}>
                <a href={href} target="_blank">sssss{this.props.index + 1}.  {newsItem.text}</a>
            </li>
        )
    }
});

module.exports = NewsItem;
