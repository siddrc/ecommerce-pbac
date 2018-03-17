var router = require('express').Router();
var policyMasterPermissionTypesController = require("../controllers/policyMasterPermissionTypesController");
router.get('/', function(req, res) {
    policyMasterPermissionTypesController.get(function(response) {
        res.send(response);
    })
});
module.exports = router;
