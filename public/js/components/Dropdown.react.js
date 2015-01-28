var React = require('react');

var DropdownItem = React.createClass({
    itemClick: function (e) {
        this.props.onClick.call(this, e);
    },
    render: function () {
        return (
            <li className="dropdown__item" key={this.props.item} id={this.props.index} onClick={this.itemClick}>
                <a href="javascript:void(0)" className="dropdown__anchor" data-key={this.props.item.key}>{this.props.item.text}</a>
            </li>
        )
    }
});

var Dropdown = React.createClass( {
    clickEvents: function (event) {
        this.props.clickEvent();
    },
    toggle: function (e) {
        var targetElem = event.target;
        var parentElem = targetElem.parentNode;
        parentElem.classList.toggle("dropdown__active")
    },
    itemClick: function (e) {
        var targetElem = event.target;
        var dropDownElem = targetElem.parentNode;
        while(!dropDownElem.classList.contains("dropdown")) {
            dropDownElem = dropDownElem.parentNode;
        }
        dropDownElem.classList.remove("dropdown__active")

    },
    render: function () {
        var dropdownData = this.props.data;
        var rows = [];

        dropdownData.forEach(function (item, index) {
            rows.push(<DropdownItem item={item} index={index} />);
        });

        return (
            <div className="dropdown">
                <span className="dropdown__selected" onClick={this.toggle}>Testing</span>
                <ul className="dropdown__list">
                    {rows}
                </ul>
            </div>
        )
    }
});
module.exports = Dropdown;
