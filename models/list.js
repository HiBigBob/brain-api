var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('List', new Schema({
    name: String,
    createTime: { type: Date, default: Date.now }
}));
