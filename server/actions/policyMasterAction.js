var router = require('express').Router();
var policyMasterController = require("../controllers/policyMasterController");
router.get('/', function(req, res) {
    policyMasterController.get(function(response) {
        res.send(response);
    })
});
module.exports = router;
