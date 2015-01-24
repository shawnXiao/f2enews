var React = require('react');

var DropdownItem = React.createClass({
    render: function () {
        return (
            <li className="dropdown__item" key={this.props.item} id={this.props.index}>
                <a href="javascript:void(0)" className="dropdown__anchor" data-key={this.props.item.key}>{this.props.item.text}</a>
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
            <div className="dropdown">
                <span className="dropdown__selected">Testing</span>
                <ul className="dropdown__list">
                    {rows}
                </ul>
            </div>
        )
    }
});

module.exports = Dropdown;
