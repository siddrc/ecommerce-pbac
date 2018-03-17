var router = require('express').Router();
var productsController = require("../controllers/productsController");
var ordersController = require("../controllers/ordersController");
const uuidV1 = require('uuid/v1');
var path = require('path');
var ObjectID = require('mongodb').ObjectID;
router.post('/', function(req, res) {
    var product = req.body.product;
    var _id = new ObjectID();
    product._id = _id;
    req.session.productId = _id;
    product.category = new ObjectID(product.category);
    if (req.session.whoAmI === "merchant") {
        product.merchant = new ObjectID(req.session.userId);
    }
    productsController.create(product, function(response) {
        res.send(_id);
    })
});
router.get("/", function(req, res) {
    var skip = parseInt(req.query.skip);
    var limit = parseInt(req.query.limit);
    var merchantId = req.session.userId;
    productsController.getByMerchant(merchantId, skip, limit, function(response) {
        res.send(response);
    });
})
router.get("/totalCount", function(req, res) {
    var merchantId = req.session.userId;
    productsController.getTotalCountByMerchant(merchantId, function(response) {
        res.send(response);
    });
});
router.get("/product/details", function(req, res) {
    var productId = req.query.id;
    productsController.getProductDetails(productId, function(response) {
        res.send(response);
    });
});
router.delete("/:productId", function(req, res) {
    var productId = req.params.productId;
    ordersController.checkIfProductIsInActiveOrder(productId, function(response) {
        if (response.result === 0) {
            productsController.delete(productId, function(response) {
                response.msg = "Product is absent in active order, hence delete successful.";
                res.status(200).send(response);
            });
        }else{
            var response = {};
            response.msg = "Product is present in active order, delete order first."
            res.status(500).send(response)
        }

    })

})
module.exports = router;
