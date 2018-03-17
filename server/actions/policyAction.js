var router = require('express').Router();
var policyController = require("../controllers/policyController");
var usersController = require("../controllers/usersController");
router.get('/', function(req, res) {
    var policyInfo = {
        name: "Customer"
    }
    policyController.get(policyInfo, function(response) {
        if (req.session.isLoggedIn == undefined || req.session.isLoggedIn == null || req.session.isLoggedIn == "N") {
            req.session.defaultPolicy = response.result;
        }
        res.send(response);
    })
});
router.get('/check', function(req, res) {
    var typeOfAction = req.query.typeOfAction;
    var entity = req.query.entity;
    var defaultPolicy = req.session.defaultPolicy;
    if (defaultPolicy === undefined || defaultPolicy === null) {
        res.status(500).send("N");
    } else {
        res.send(defaultPolicy.policy[entity][typeOfAction]);
    }
});
router.post("/", function(req, res) {
    var policyDetails = req.body.policyDetails;
    policyController.create(policyDetails, function(response) {
        res.send(response);
    })
});
router.get('/all', function(req, res) {
    policyController.getAll(function(response) {
        res.send(response);
    })
});
router.get('/detail', function(req, res) {
    var policyId = req.query.policyId;
    policyController.getDetail(policyId, function(response) {
        res.send(response);
    });
})
router.put('/', function(req, res) {
    var policyDetails = req.body.policyDetails;
    policyController.update(policyDetails, function(response) {
        res.send(response);
    })
})
router.delete('/:policyId', function(req, res) {
    var policyId = req.params.policyId;
    usersController.checkIfUserAssociatedWithThisPolicy(policyId, function(countOfUsersAssociatedWithThisPolicy) {
        if (countOfUsersAssociatedWithThisPolicy.result  === 0) {
            policyController.delete(policyId, function(response) {
                response.msg = "Policy deleted."
                res.send(response);
            });
        }else if(countOfUsersAssociatedWithThisPolicy.result > 1){
               var response = {};
               response.msg = "Policy cannot be deleted, as there are users mapped to this policy,delete the users mapped to this policy first."
               res.status(500).send(response);
        }
    });
});
module.exports = router;
