var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Task', new Schema({
    name: String,
    createTime: { type: Date, default: Date.now },
    completeTime: Date,
    completed: Boolean
}));
