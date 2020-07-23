const async = require("async");
const _lodash = require('lodash');
const _ = require('underscore');

const common = require('../utils/common');
const user = require('../model/user');


const _self = {};

_self.getUsers = (req, callback) => {
    processgetUsers(req.body, callback);
}

const processgetUsers = (request_data, callback) => {
    user.processgetUsers((err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}


module.exports = _self;