var React = require('react');
var NewsStore = require('../stores/NewsStore');
var TwittsStore = require('../stores/TwittsStore');
var NavbarStore = require('../stores/NavbarStore');
var UserStore = require('../stores/UserStore');
var ClassicsStore = require('../stores/ClassicsStore');
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
    dropdownData : [{
        key: "news",
        text: "前端新闻"
    },{
        key: "twitts",
        text: "热门 Twitts"
    },{
        key: "classics",
        text: "前端经典"
    }],
    getInitialState: function () {
        var searchStr = location.search.slice(1);
        if (searchStr) {
            var queryList = searchStr.split("&");
            var queryObj = {};
            queryList.forEach(function (item) {
                queryObj[item.split("=")[0]] = item.split("=")[1];
            });

            if (queryObj.code) {
                UserStore.oauthGithub();
            }

            if (queryObj.source) {
                var initIndex = 0;
                this.dropdownData.forEach(function (item, index) {
                    if (item.key === queryObj.source) {
                        initIndex = index;
                    }
                });
                if (initIndex > 0) {
                    NewsActions.changeSource(queryObj.source);

                    var tempt = this.dropdownData[0];
                    var length = this.dropdownData.length;
                    this.dropdownData[0] = this.dropdownData[initIndex];
                    this.dropdownData[length - 1] = tempt;
                }
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
        ClassicsStore.addChangeListener(this._onChange);
    },
    componentWillUnMount: function () {
        NewsStore.removeChageListener(this._onChange);
        TwittsStore.removeChageListener(this._onChange);
        ClassicsStore.removeChageListener(this._onChange);
    },
    changeSource: function (source) {
        NewsActions.changeSource(source);
    },
    render: function () {

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
                        <Dropdown data={this.dropdownData} clickEvent={this.changeSource.bind(self)} />
                    </div>
                    <section id="news">
                        {content}
                    </section>
                </div>
            </div>
        )
    },
    _onChange: function () {
        this.setState(getNewsState());
    }
});

module.exports = NewsApp;
