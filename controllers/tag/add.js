'use strict';

var model = require('./../../models/tag.model');
var utils = require('./../../utils');
var API = require('./../../APILib');

module.exports = (req, res) => {
    var data = req.body;
    var authInfo = utils.getAuthInfo(req.headers.authorization);
    data.createdBy = authInfo._id;
    var objData = new model(data);

    var promise = objData.save();

    promise.then(function (doc) {
        if (doc.errors) {
            return API.fail(res, API.errors.UNKNOWN);
        }
        API.success(res, {
            message: 'Success!',
            statusCode: 0
        });
    });
};