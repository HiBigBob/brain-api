var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Task', new Schema({
    _creator: { type: Schema.Types.ObjectId, ref: 'List' },
    name: String,
    createTime: { type: Date, default: Date.now },
    completeTime: Date,
    completed: Boolean
}));
