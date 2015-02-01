
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ClassicsSchema = new Schema({
    title: String,
    vote: Number,
    href: String
}, {
    collection: 'classicslist'
});

module.exports = mongoose.model('Classics', ClassicsSchema);
