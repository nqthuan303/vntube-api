'use strict';

var model = require('./../../models/tag.model');

function getObjSearch(objQuery) {
  var query = {};

  var arrAnd = [];

  if (objQuery.keyword !== "null" && objQuery.keyword != '' && objQuery.keyword) {
    arrAnd.push({
      '$or': [{
          'name': new RegExp(".*" + objQuery.keyword.replace(/(\W)/g, "\\$1") + ".*", "i")
        }
      ]
    });
  }


  if (arrAnd.length > 0) {
    query.$and = arrAnd;
  }
  return query;
}

module.exports = (req, res) => {
    var objQuery = req.query;

    var objSort = {
        'createdAt': -1
    };
    if (objQuery.sortField && objQuery.sortValue) {
        objSort = {};
        objSort[objQuery.sortField] = objQuery.sortValue;
    }

    var objSearch = getObjSearch(objQuery);

    var recordsPerPage = Number(objQuery.recordsPerPage);
    var page = Number(objQuery.page);
    var skip = (page - 1) * recordsPerPage;

    model.find(objSearch)
        .limit(recordsPerPage)
        .skip(skip)
        .sort(objSort)
        .exec(function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
};