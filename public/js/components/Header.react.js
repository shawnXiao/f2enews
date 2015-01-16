var React = require('react');
var Button = require('./Button.react');
var NewsActions = require('../actions/NewsActions');

var Navbar = React.createClass({
    getInitialState: function () {
        return {
            isFixed: false
        }
    },
    changeSource: function () {
        NewsActions.changeSource();
    },
    componentDidMount: function () {
        window.addEventListener('scroll', this.onScroll, false)
    },
    componentWillUnMount: function () {
        window.removeEventListener('scroll', this.onScroll)
    },
    render: function () {
        return (
            <div>
                <header className={className}>
                    <div className="header-title">
                        F2E News
                    </div>
                    <InputSearch />
                    <Navigator />
                    <Profile />
                </header>
            </div>
        )
    }
});

module.exports = Navbar;
