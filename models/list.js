var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('List', new Schema({
    _creator : { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    createTime: { type: Date, default: Date.now },
    tasks : [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}));
