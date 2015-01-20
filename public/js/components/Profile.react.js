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
                <span className="icon-github3 profile-icon" onClick={this.triggerDialog}></span>
                <div className="profile"></div>
            </div>
        )
    }
});

module.exports = Profile
