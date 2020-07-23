var express         = require('express');
var router          = express.Router();
var taxis         = require('../lib/controller/taxis');
var response        = require('../lib/utils/response');

// Handle response from taxis controller
var respond_book_resquest = (req, res) => {
    taxis.processtaxis(req, (err, data) => {
        response.handleResponse(err, data, res);
    });
}

var respond_unbook_resquest = (req, res) => {
    taxis.processtaxis(req, (err, data) => {
        response.handleResponse(err, data, res);
    });
}

var respond_cabs_resquest = (req, res) => {
    taxis.processtaxis(req, (err, data) => {
        response.handleResponse(err, data, res);
    });
}

var respond_rides_resquest = (req, res) => {
    taxis.processtaxis(req, (err, data) => {
        response.handleResponse(err, data, res);
    });
}

/* POST taxis API. */
router.put('/book/:cab_id', respond_book_resquest);
router.put('/unbook/:cab_id', respond_unbook_resquest);
router.get('/', respond_cabs_resquest);
router.get('/rides/:cab_id', respond_rides_resquest);

module.exports = router;
