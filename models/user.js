var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    username: String,
    password: String,
    lists : [{ type: Schema.Types.ObjectId, ref: 'List' }]
}));
