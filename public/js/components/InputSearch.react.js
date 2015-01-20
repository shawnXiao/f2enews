var React = require('react');

var InputSearch = React.createClass({
    render: function () {
        return (
            <div className="input-search__wrapper">
                <input type="text" id={this.props.id} className="input-search__input" placeholder="Search"/>
                <span className="icon-search input-search__icon"></span>
            </div>
        )
    }
});

module.exports = InputSearch;
