var router = require('express').Router();
var usersController = require("../controllers/usersController");
var policyController = require("../controllers/policyController");
var productsController = require("../controllers/productsController");
var ordersController = require("../controllers/ordersController");
var ObjectID = require('mongodb').ObjectID;
router.get('/uniqueEmail', function(req, res) {
    var userEmail = req.query.email;
    var userInfo = {
        userEmail: userEmail
    }
    usersController.checkUniqueEmail(userInfo, function(response) {
        res.send(response);
    })
})
router.get('/authUser', function(req, res) {
    var userEmail = req.query.userEmail;
    var userPassword = req.query.userPassword;
    var userInfo = {
        userEmail: userEmail,
        userPassword: userPassword
    }
    usersController.authUser(userInfo, function(response) {
        if (response.hasOwnProperty("result") && response.result.length > 0) {
            req.session.isLoggedIn = "Y"
            req.session.userId = response.result[0]._id;
            req.session.loggedInUserName = response.result[0].name;
            req.session.defaultPolicy = response.result[0].policy[0];
            response.whoAmI = getWhoAmI(response.result[0].isCustomer, response.result[0].isMerchant);
            req.session.whoAmI = response.whoAmI;
        }
        res.send(response);
    })

});

function getWhoAmI(isCustomer, isMerchant) {
    if (isCustomer)
        return "customer";
    else if (isMerchant)
        return "merchant";
    else if (!isCustomer && !isMerchant)
        return "admin";
}
router.get('/checkIfLoggedIn', function(req, res) {
    var session = req.session;
    var result = {};
    if (!req.session.hasOwnProperty("isLoggedIn")) {
        result.isLoggedIn = "N";
        result.loggedInUserName = "";
    } else {
        result.isLoggedIn = session.isLoggedIn;
        result.loggedInUserName = session.loggedInUserName;
    }
    res.send(result)
})
router.get('/logout', function(req, res) {
    req.session.isLoggedIn = "N";
    req.session.loggedInUserName = "";
    var policyInfo = {
        name: "Customer"
    }
    policyController.get(policyInfo, function(response) {
        req.session.defaultPolicy = response.result;
        res.send("")
    });
})
router.post("/", function(req, res) {
    var adminUser = req.body.adminUser;
    adminUser.policyId = new ObjectID(adminUser.policyId);
    usersController.create(adminUser, function(response) {
        res.send(response);
    })
});
router.post("/customer", function(req, res) {
    var customer = req.body.customer;
    customer.policyId = new ObjectID("58b2cbcb616e9a49e091812f");
    usersController.create(customer, function(response) {
        res.send(response);
    })
});
router.post("/merchant", function(req, res) {
    var merchant = req.body.merchant;
    merchant.policyId = new ObjectID("58dacecdbfe7e52878b0091a");
    usersController.create(merchant, function(response) {
        res.send(response);
    })
});
router.get("/customers", function(req, res) {
    var customers = {};
    customers.policyId = new ObjectID("58b2cbcb616e9a49e091812f");
    usersController.get(customers, function(response) {
        res.send(response);
    })
});
router.get("/merchants", function(req, res) {
    var merchants = {};
    merchants.policyId = new ObjectID("58dacecdbfe7e52878b0091a");
    usersController.get(merchants, function(response) {
        res.send(response);
    })
});
router.delete("/merchants/:merchantId", function(req,res) {
    var merchant = {};
    var merchantId = req.params.merchantId;
    merchant._id = new ObjectID(merchantId);
    productsController.checkIfMerchantStillHasProducts(merchant, function(response) {
        if (response.result === 0) {
            usersController.delete(merchant, function(innerResponse) {
                innerResponse.msg = "Merchant has no products,hence deleted.";
                res.send(innerResponse);
            })
        } else {
            var innerResponse = {};
            innerResponse.msg = "Merchant still has products, please delete the products."
            res.status(500).send(innerResponse);
        }
    })

})
router.delete("/customers/:customerId", function(req,res) {
    var customer = {};
    var customerId = req.params.customerId;
    customer._id = new ObjectID(customerId);
    ordersController.checkIfCustomerStillHasOrders(customer, function(response) {
        if (response.result === 0) {
            usersController.delete(customer, function(innerResponse) {
                innerResponse.msg = "Customer has no active orders,hence deleted.";
                res.send(innerResponse);
            })
        } else {
            var innerResponse = {};
            innerResponse.msg = "Customer still has active orders, please delete the orders of this customer first."
            res.status(500).send(innerResponse);
        }
    })

})
router.get("/", function(req, res) {
    var adminUsers = {};
    usersController.getOnlyAdminUsers( function(response) {
        res.send(response);
    })
});
router.get("/detail", function(req, res) {
    var adminUsers = {};
    var userId = req.query.adminUserId;
    adminUsers._id = new ObjectID(userId);
    usersController.getDetail(adminUsers, function(response) {
        res.send(response);
    })
});
router.delete("/deleteAdmin/:userId", function(req, res) {
    var adminUsers = {};
    var userId = req.params.userId;
    adminUsers._id = new ObjectID(userId);
    usersController.delete(adminUsers, function(response) {
        res.send(response);
    })
});
router.delete("/deleteCustomer/:userId", function(req, res) {
    var adminUsers = {};
    var userId = req.params.userId;
    adminUsers._id = new ObjectID(userId);
    //check orders then delete user
    /*usersController.delete(adminUsers, function(response) {
        res.send(response);
    })*/
});
module.exports = router;
