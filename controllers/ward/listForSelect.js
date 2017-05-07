'use strict';

let async = require('asyncawait/async'),
    await = require('asyncawait/await');

var model = require('./../../models/ward.model');

module.exports = async((req, res) => {
    var objQuery = req.query;
  var districtId = objQuery.districtId;

  model.aggregate([
    { $match : { district_id : districtId } },
      { 
        "$project": {
          "_id": false,
          "value": "$_id",
          "label": { $concat: [ "$type", " ", "$name" ] }
        }
      }
  ], function(err, data) {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });

});