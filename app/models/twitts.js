var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TwittsSchema = new Schema({
    text: String,
    created_time: Date,
    user: {
        name: String,
        description: String,
        photo: String
    }
}, {
    collection: 'twittsList'
});

module.exports = mongoose.model('Twitts', TwittsSchema);
