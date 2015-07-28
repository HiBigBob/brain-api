var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('List', new Schema({
    userId: String,
    name: String,
    createTime: { type: Date, default: Date.now },
    tasks : [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}));
