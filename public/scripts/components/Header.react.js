var React = require('react');
var Button = require('./Button.react');
var Profile = require('./Profile.react');
var InputSearch = require('./InputSearch.react');
var Navigator = require('./Navigator.react');
var NewsActions = require('../actions/NewsActions');

var Navbar = React.createClass({
    getInitialState: function () {
        return {
            isFixed: false
        }
    },
    componentDidMount: function () {
        window.addEventListener('scroll', this.onScroll, false)
    },
    componentWillUnMount: function () {
        window.removeEventListener('scroll', this.onScroll)
    },
    render: function () {

        var navigatorData = [{
            text: "W3C",
            imgUrl: "w3c.ico",
            link: "http://www.w3c.org/TR"
        }, {
            text: "MDN",
            imgUrl: "mdn.png",
            link: "https://developer.mozilla.org/en-US/docs/Web/Guide"
        }, {
            text: "caniuse",
            imgUrl: "caniuse.png",
            link: "http://caniuse.com/"
        }, {
            text: "css-tricks",
            imgUrl: "csstricks.png",
            link: "http://css-tricks.com/"
        }, {
            text: "smashingmagazine",
            imgUrl: "smashing.png",
            link: "http://www.smashingmagazine.com/"
        }, {
            text: "html5rocks",
            imgUrl: "html5rocks.ico",
            link: "http://www.html5rocks.com/en/"
        }];


        return (
            <div>
                <header>
                    <div className="header-title header-title_image">F2E News</div>
                    <div className="header__side">
                        <Navigator data={navigatorData} className="header__item"/>
                        <Profile className="header__item"/>
                    </div>
                </header>
            </div>
        )
    }
});

module.exports = Navbar;
