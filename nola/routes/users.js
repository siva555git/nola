var express         = require('express');
var router          = express.Router();
var users         = require('../lib/controller/user');
var response        = require('../lib/utils/response');

// Handle response from project controller
var respond_users_request = (req, res) => {
  users.processUsers(req, (err, data) => {
        response.handleResponse(err, data, res);
    });
}

/* POST project API. */
router.get('/', respond_users_request);

module.exports = router;
