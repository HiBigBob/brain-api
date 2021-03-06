var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Task', new Schema({
    categoryId: String,
    userId: String,
    name: String,
    description: String,
    createTime: { type: Date, default: Date.now },
    deadLineTime: { type: Date, default: Date.now },
    completeTime: Date,
    completed: Boolean
}));
