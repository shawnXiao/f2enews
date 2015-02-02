var React = require('react');
var NewsStore = require('../stores/NewsStore');
var TwittsStore = require('../stores/TwittsStore');
var NavbarStore = require('../stores/NavbarStore');
var UserStore = require('../stores/UserStore');
var News = require('./News.react');
var Navbar = require('./Header.react');
var Button = require('./Button.react');
var Twitts = require('./Twitts.react');
var Classics = require('./Classics.react');
var Dropdown = require('./Dropdown.react');
var NewsActions = require('../actions/NewsActions')

function getNewsState(){
    return {
        news: NewsStore.getNews(),
        source: NavbarStore.getSource(),
        classics: ClassicsStore.getClassics(),
        twitts: TwittsStore.getTwitts()
    }
}

var NewsApp = React.createClass({
    getInitialState: function () {
        var searchStr = location.search.slice(1);
        if (searchStr) {
            var queryList = searchStr.split("&");
            var queryObj = {};
            queryList.forEach(function (item) {
                queryObj[item.split("=")[0]] = item.split("=")[1];
            });
            if (queryList.code) {
                UserStore.oauthGithub();
            }
        }
        return getNewsState();
    },
    getMoreNews: function () {
        NewsActions.getMoreNews(this.state.start);
    },
    componentDidMount: function () {
        this.state.opacity = 0;
        this.state.elemOffsetX = 0;
        this.state.elemOffsetY = 0;
        NewsStore.addChangeListener(this._onChange);
        TwittsStore.addChangeListener(this._onChange);
        NavbarStore.addChangeListener(this._onChange);
    },
    componentWillUnMount: function () {
        NewsStore.removeChageListener(this._onChange);
        TwittsStore.removeChageListener(this._onChange);
    },
    changeSource: function (source) {
        NewsActions.changeSource(source);
    },
    render: function () {
        var  dropdownData = [{
            key: "news",
            text: "前端新闻"
        },{
            key: "twitts",
            text: "热门 Twitts"
        },{
            key: "classics",
            text: "前端经典"
        }];

        var content;
        if (this.state.source == "news") {
            content = <News news={this.state.news} />;
        }

        if (this.state.source == "twitts") {
            content = <Twitts twitts={this.state.twitts} />;
        }

        if (this.state.source == "classics") {
            content = <Classics classics={this.state.classics} />;
        }

    return (
            <div>
                <Navbar />
                <div className="bd">
                    <div className="row">
                        <Dropdown data={dropdownData} clickEvent={this.changeSource.bind(self)} />
                    </div>
                    <section id="news">
                        {this.state.source == "news" ?  :  />}
                    </section>
                </div>
            </div>
        )
    },
    _onChange: function () {
        this.setState(getNewsState());
        console.log(this.state.source);
    }
});

module.exports = NewsApp;
