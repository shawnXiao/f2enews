var React = require('react');
var NewsActions = require('../actions/NewsActions');
var NewsItem = require('./NewsItem.react');
var Button = require('./Button.react');

var News = React.createClass({
    getMoreNews: function () {
        NewsActions.getMoreNews();
    },
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
                <Button className="flat-btn full-btn" text="More News" clickEvent={this.getMoreNews.bind(self)}/>
            </div>
        )
    }
});

module.exports = News;
