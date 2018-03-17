var router = require('express').Router();
var productsController = require("../controllers/productsController");
const uuidV1 = require('uuid/v1');
var path = require('path');
var ObjectID = require('mongodb').ObjectID;
router.post('/', function(req, res) {
    var product = req.body.product;
    var _id = new ObjectID();
    product._id = _id;
    req.session.productId = _id;
    product.category = new ObjectID(product.category);
    if (product.merchant === "System") {
        product.merchant = new ObjectID(req.session.userId);
    }
    productsController.create(product, function(response) {
        res.send(_id);
    })
})
router.post('/uploadProductImage', function(req, res) {
    var productImage = req.files.productImage;
    var productId = req.session.productId;
    var uploadTo = path.join(__dirname, '../../public/productImages');
    var extension = productImage.name.substring((productImage.name.length - 5), productImage.name.length);
    var fileName = uuidV1() + extension;
    productImage.name = fileName;
    productImage.mv(uploadTo + '/' + productImage.name, function(err) {
        var productImageObj = {
            productId: new ObjectID(productId),
            productImageFileName: fileName
        }
        productsController.updateWithImageName(productImageObj, function(response) {
            req.session.productId = null;
            res.redirect('../../#/productCreated');
        })

    })
});
router.get("/", function(req, res) {
    var skip = parseInt(req.query.skip);
    var limit = parseInt(req.query.limit);
    productsController.get(skip,limit,function(response) {
        res.send(response);
    });
})
router.get("/totalCount", function(req, res) {
    productsController.getTotalCount(function(response) {
        res.send(response);
    });
});
router.get("/product/details",function(req,res){
    var productId = req.query.id;
    productsController.getProductDetails(productId,function(response) {
        res.send(response);
    });
})
module.exports = router;
