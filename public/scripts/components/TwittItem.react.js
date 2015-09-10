var React = require('react');

var TwittItem = React.createClass({
    render: function () {
        var twittItem = this.props.twittItem;
        var twittText = twittItem.text;
        twittText = twittText.replace(/((http|https)[^\s]*)/, function (m1, m2) {
            return "<a target='_blank' href='" + m1+ "'>"+ m1 +"</a>"
        });
        return (
            <li key={twittItem} id={this.props.index}>
                <div>
                    <div>
                        <a>
                            <img src={twittItem.user.profile_image_url}/>
                            <strong>{twittItem.user.name}</strong>
                        </a>
                        <span>{twittItem.created_at}</span>
                    </div>
                    <p dangerouslySetInnerHTML={{__html: twittText}}></p>
                </div>
            </li>
        )
    }
});

module.exports = TwittItem;
