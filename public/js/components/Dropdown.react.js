var React = require('react');

var DropdownItem = React.createClass({
    render: function () {
        return (
            <li key={this.props.item} id={this.props.index}>
                <a href="javascript:void(0)" data-key={this.props.item.key}>{this.props.item.text}</a>
            </li>
        )
    }
});

var Dropdown = React.createClass( {
    clickEvents: function (event) {
        this.props.clickEvent();
    },
    render: function () {
        var dropdownData = this.props.data;
        var rows = [];

        dropdownData.forEach(function (item, index) {
            rows.push(<DropdownItem item={item} index={index} />);
        });

        return (
            <ul>
                {rows}
            </ul>
        )
    }
});

module.exports = Dropdown;
