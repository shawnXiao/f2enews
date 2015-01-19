var React = require('react');

var NavigatorItem = React.createClass({
    render: function () {
        return (
            <li className="navigator-item">
                <a href={this.props.item.link} title={this.props.item.text} target="_blank">
                    <img className="navigator-potrit" src={this.props.item.imgUrl} alt={this.props.item.text}/>
                    <p>{this.props.item.text}</p>
                </a>
            </li>
        )
    }
});

var Navigator = React.createClass({
    render: function () {
        console.log(this.props);
        var navigatorData = this.props.data;
        var navis = []

        navigatorData.forEach(function (item, index) {
            navis.push(<NavigatorItem className="navigator-item" item={item} index={index} />);
        });

        return (
            <div className={this.props.className}>
                <span className="navigator-icon"></span>
                <ul className="navigator">
                    {navis}
                </ul>
            </div>
        )

    }
});

module.exports = Navigator;
