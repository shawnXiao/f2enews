var React = require('react');

var NavigatorItem = React.createClass({
    render: function () {
        var imgSrc = "/images/favicons/" + this.props.item.imgUrl;
        return (
            <li className="navigator-item">
                <a href={this.props.item.link} title={this.props.item.text} target="_blank" className="navigator-potrit__wrapper">
                    <img className="navigator-potrit__image" src={imgSrc} alt={this.props.item.text}/>
                    <p className="navigator-potrit__text">{this.props.item.text}</p>
                </a>
            </li>
        )
    }
});

var Navigator = React.createClass({
    triggerDialog: function (e) {
        var parentElem = e.target.parentNode;
        var navigatorElem = parentElem.querySelector('.navigator');
        if (navigatorElem.classList.contains("show")) {
            navigatorElem.classList.remove("show")
        } else {
            navigatorElem.classList.add("show")
        }
    },
    render: function () {
        var navigatorData = this.props.data;
        var navis = []

        navigatorData.forEach(function (item, index) {
            navis.push(<NavigatorItem className="navigator-item" item={item} index={index} />);
        });

        return (
            <div className={this.props.className}>
                <span className="icon-grid navigator-icon" onClick={this.triggerDialog}></span>
                <ul className="navigator">
                    {navis}
                </ul>
            </div>
        )
    }
});

module.exports = Navigator;
