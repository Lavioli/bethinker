var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StickySchema = new Schema({
    title: String,
    date: Date,
    content: String,
    rating: { type: Number, min: 1, max: 3 }
});

module.exports = mongoose.model('Sticky', StickySchema);