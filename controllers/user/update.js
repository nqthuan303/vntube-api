'use strict';

let async = require('asyncawait/async'),
  await = require('asyncawait/await');

var model = require('./../../models/user.model');
var API = require('./../../APILib');

module.exports = async((req, res) => {
  var id = req.params.id;

  var data = req.body;

  model.findOneAndUpdate({
    _id: id
  }, data, function (err, doc) {
    var result = {
      "statusCode": 0,
      "message": "Success"
    }
    if (err) {
      result.statusCode = -1;
      result.message = "Error";
    }
    res.json(result);
  });
});