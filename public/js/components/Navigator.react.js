var React = require('react');

var NavigatorItem = React.createClass({
    render: function () {
        return (
            <li>
                <a href={this.props.item.link} title={this.props.item.text} target="_blank">
                    <img src={this.props.item.imgUrl} alt={this.props.item.text}/>
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
            navis.push(<NavigatorItem item={item} index={index} />);
        });

        return (
            <div>
                <ul>
                    {navis}
                </ul>
            </div>
        )

    }
});

module.exports = Navigator;
