const async = require("async");
const _lodash = require('lodash');
const _ = require('underscore');

const common = require('../utils/common');
const taxis = require('../model/taxis');
const moment = require('moment');



const _self = {};

_self.bookCab = (req, callback) => {
    let cab_id = req.params.type;
    processBookCab(req.body, callback);
}

_self.unBookCab = (req, callback) => {
    let cab_id = req.params.type;
    processUnBookCab(req.body, callback);
}

_self.getCabs = (req, callback) => {
    processgetCabs(req.body, callback);
}

_self.getCabRides = (req, callback) => {
    let cab_id = req.params.type;
    processgetCabRides(req.body, callback);
}

const processgetCabRides = (request_data, callback) => {
    taxis.processgetCabRides(request_data.cab_id, (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

const processgetCabs = (request_data, callback) => {
    taxis.processgetCabs((err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}


const processBookCab = (request_data, callback) => {
    var taxi = {};
    taxi.cab_id = request_data.cab_id;
    taxi.user_id = request_data.user_id;
    taxi.from = request_data.from;
    taxi.to = request_data.to;
    taxi.status = 'Inprogress';

    var rideHistoryAdd = (waterfall_cb) => {
        console.log('project_details :', project_details);
        taxis.add(taxi,'ride_history', (err, data) => {
            if (err) return waterfall_cb(err);
            console.log('project data :', data);
            if (_.isEmpty(data) || (data.insertId && data.insertId == 0)) return waterfall_cb('Some error on inserting data in cabs');
            waterfall_cb(null, {
                "cab_id": taxi.cab_id,
                "user_id": taxi.user_id,
            });
        });
    }

    var updateCab = (cabdetails, update_cb) => {
        var cab = {};
        cab.avaiable = false;
        taxis.update(cabdetails.cab_id, cab,'cabs', (err, data) => {
            if (err)
                return update_cb(err);

            if (_.isEmpty(data) || (data.affectedRows && data.affectedRows == 0))
                return update_cb('Some error on inserting data in cabs');

            update_cb(null, cabdetails);
        });
    }

    var updateUser = (cabdetails, update_cb) => {
        var cab = {};
        cab.in_ride = true;
        taxis.update(cabdetails.user_id, cab,'users', (err, data) => {
            if (err)
                return update_cb(err);

            if (_.isEmpty(data) || (data.affectedRows && data.affectedRows == 0))
                return update_cb('Some error on inserting data in cabs');

            update_cb(null, cabdetails);
        });
    }

    async.waterfall([
        rideHistoryAdd,
        updateCab,
        updateUser,
    ], (err) => {
        if (err) return callback(err);
        callback();
    })

}

const processUnBookCab = (request_data, callback) => {
    var taxi = {};
    taxi.cab_id = request_data.cab_id;
    taxi.user_id = request_data.user_id;
    taxi.from = request_data.from;
    taxi.to = request_data.to;
    taxi.status = 'Inprogress';

    var updateRideHistory = (taxi, update_cb) => {
        var cab = {};
        cab.status = request_data.status;
        taxis.update(taxi.cab_id, cab,'ride_history',(err, data) => {
            if (err)
                return update_cb(err);

            if (_.isEmpty(data) || (data.affectedRows && data.affectedRows == 0))
                return update_cb('Some error on inserting data in cabs');

            update_cb(null, cabdetails);
        });
    }

    var updateCab = (cabdetails, update_cb) => {
        var cab = {};
        cab.avaiable = true;
        taxis.update(cabdetails.cab_id, cab,'cabs',(err, data) => {
            if (err)
                return update_cb(err);

            if (_.isEmpty(data) || (data.affectedRows && data.affectedRows == 0))
                return update_cb('Some error on inserting data in cabs');

            update_cb(null, cabdetails);
        });
    }

    var updateUser = (cabdetails, update_cb) => {
        var cab = {};
        cab.in_ride = false;
        taxis.update(cabdetails.user_id, cab,'users',(err, data) => {
            if (err)
                return update_cb(err);

            if (_.isEmpty(data) || (data.affectedRows && data.affectedRows == 0))
                return update_cb('Some error on inserting data in cabs');

            update_cb(null, cabdetails);
        });
    }

    async.waterfall([
        updateRideHistory,
        updateCab,
        updateUser,
    ], (err) => {
        if (err) return callback(err);
        callback();
    })

}


module.exports = _self;