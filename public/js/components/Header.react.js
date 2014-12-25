var React = require('react');
var Button = require('./Button.react');
var NewsActions = require('../actions/NewsActions');

var Navbar = React.createClass({
    getInitialState: function () {
        return {
            isFixed: false
        }
    },
    onScroll: function (event) {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var isFiexed = false;
        if (scrollTop > 130) {
            isFiexed = true;
        } else {
            isFiexed = false;
        }

        this.setState({isFixed: isFiexed});

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
        var className = this.state.isFixed ? '' : '';
        var classNameFake = this.state.isFixed ? 'header-fixed' : 'fake';
        return (
            <div>
                <header className={className}>
                    <div className="header-title">
                        F2E News
                    </div>
                    <Button className="circle-btn float-btn" text="More" clickEvent={this.changeSource} />
                </header>
                <header className={classNameFake}>
                    <div className="header-title">
                        F2E News
                    </div>
                    <Button className="circle-btn float-btn" text="More" clickEvent={this.changeSource} />
                </header>
            </div>
        )
    }
});

module.exports = Navbar;
