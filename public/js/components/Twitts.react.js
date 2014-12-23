var React = require('react');
var NewsActions = require('../actions/NewsActions');
var TwittItem = require('./TwittItem.react');
var Button = require('./Button.react');

var Twitts = React.createClass({
    getMoreTwitts: function () {
        NewsActions.getMoreTwitts();
    },
    render: function () {
        var selft = this;
        var twitts = this.props.twitts;
        var newsRows = [];
        twitts.forEach(function (twittItem, index) {
            newsRows.push(<TwittItem twittItem={twittItem} index={index} />)
        })

        return (
            <div>
                <ul>
                    {newsRows}
                </ul>
                <Button className="flat-btn full-btn" text="More Twitts" clickEvent={this.getMoreTwitts.bind(self)}/>
            </div>
        )
    }
});

module.exports = Twitts;
