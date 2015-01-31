var React = require('react');

var DropdownItem = React.createClass({
    itemClick: function (e) {
        var targetElem = event.target;
        var dropDownElem = targetElem.parentNode;
        while(!dropDownElem.classList.contains("dropdown")) {
            dropDownElem = dropDownElem.parentNode;
        }
        var selectedElem = dropDownElem.querySelector(".dropdown__selected");
        selectedElem.innerText = targetElem.innerText;
        selectedElem.setAttribute("data-key", targetElem.getAttribute("data-key"));
        dropDownElem.classList.remove("dropdown__active")
        this.props.clickEvent.call(e, targetElem.getAttribute("data-key"));
    },
    render: function () {
        return (
            <li className="dropdown__item" key={this.props.item} id={this.props.index} data-key={this.props.item.key} onClick={this.itemClick}>
                {this.props.item.text}
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
    render: function () {
        var dropdownData = this.props.data;
        var rows = [];
        var that = this;

        dropdownData.forEach(function (item, index) {
            rows.push(<DropdownItem item={item} index={index} clickEvent={that.props.clickEvent} />);
        });

        return (
            <div className="dropdown">
                <span className="dropdown__selected" onClick={this.toggle}>{this.props.data[0].text}</span>
                <ul className="dropdown__list">
                    {rows}
                </ul>
            </div>
        )
    }
});
module.exports = Dropdown;
