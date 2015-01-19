var React = require('react');

var Profile = React.createClass({
    render: function () {
        return (
            <div className={this.props.className}>
                <span className="profile-icon"></span>
                <div className="profile"></div>
            </div>
        )
    }
});

module.exports = Profile
