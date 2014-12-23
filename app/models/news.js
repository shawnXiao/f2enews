var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NewsSchema = new Schema({
    text: String,
    href: String
}, {
    collection: 'itemsList'
});

module.exports = mongoose.model('News', NewsSchema);
