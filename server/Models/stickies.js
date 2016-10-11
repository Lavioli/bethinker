var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StickySchema = new Schema({
    name: String,
    date: Date,
    content: String,
    rating: { type: Number, min: 1, max: 3 }
});

var Sticky = mongoose.model('Sticky', StickySchema);

module.exports = Sticky;
