var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Category', new Schema({
    userId: String,
    name: String,
    class: String,
    createTime: { type: Date, default: Date.now }
}));
