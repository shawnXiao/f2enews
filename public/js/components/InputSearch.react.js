var React = require('react');

var InputSearch = React.createClass({
    render: function () {
        return (
            <input type="text" id={this.props.id} className="input-search"/>
        )
    }
});

module.exports = InputSearch;
