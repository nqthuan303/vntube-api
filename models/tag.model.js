var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    createdBy: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'user' }
}, {timestamps: true});

module.exports = mongoose.model('tag', objSchema, 'tag');