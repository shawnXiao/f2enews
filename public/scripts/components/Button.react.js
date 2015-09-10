var React = require('react');
var Button = React.createClass({
    getInitialState: function () {
        return {
            opacity: 0,
            elemOffsetX: 0,
            backgroundSize: '0% 0%',
            colorStep: 'rgba(0,0,0,.4), rgba(0,0,0,.2))',
            elemOffsetY: 0
        }
    },
    addRipple: function (event) {
        var targetElem = event.target;
        var elemOffsetY = event.pageY - targetElem.offsetTop;
        var elemOffsetX = event.pageX - targetElem.offsetLeft;
        var rgbaColor = getComputedStyle(targetElem)['color'];
        var currentColorList = rgbaColor.match(/\((.*)\)/)[1].split(",");

        this.setState({
            opacity: 0.6,
            backgroundSize: '100%, 100%',
            colorStep: 'rgba(' + currentColorList[0] + ', ' + currentColorList[1] + ',' + currentColorList[2] + ',.7), rgba(' + currentColorList[0] + ', ' + currentColorList[1] + ',' + currentColorList[2] + ',.1))',
            elemOffsetX: elemOffsetX,
            elemOffsetY: elemOffsetY
        });

        var self = this;
        setTimeout(function () {
            self.setState({
                opacity: 0
            })
        }, 200)
    },
    clickEvents: function (event) {
        this.addRipple(event);
        this.props.clickEvent();
    },
    render: function () {
        var overLayStyle = {
            opacity: this.state.opacity,
            background: 'radial-gradient(circle farthest-corner at ' + this.state.elemOffsetX + 'px ' + this.state.elemOffsetY + 'px, ' + this.state.colorStep + ' ',
            'background-size': this.state.backgroundSize
        };

        var className = "btn " + this.props.className;

        return (
            <button className={className} href="javascript:void(0)" onClick={this.clickEvents} >
            {this.props.text}
            {this.state.opacity > 0 ?  <div className="overlay" style={overLayStyle} ></div> : ''}
            </button>
        )
    }
});
module.exports = Button;
