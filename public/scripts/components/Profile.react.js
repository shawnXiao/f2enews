var React = require('react');

var Profile = React.createClass({
    triggerDialog: function (e) {
        var parentElem = e.target.parentNode;
        var profileElem = parentElem.querySelector('.profile');
        if (profileElem.classList.contains("show")) {
            profileElem.classList.remove("show")
        } else {
            profileElem.classList.add("show")
        }
    },

    render: function () {
        return (
            <div className={this.props.className}>
                <a className="icon-github3 profile-icon" href="https://github.com/shawnXiao/f2enews" target="_blank"></a>
                <a className="icon-weibo profile-icon" href="http://weibo.com/u/5445433790" target="_blank"></a>
            </div>
        )
    }
});

module.exports = Profile
