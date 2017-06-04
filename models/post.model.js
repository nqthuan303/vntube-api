var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objSchema = new Schema({
    title: {type: String, required: true}
});

module.exports = mongoose.model('post', objSchema, 'post');