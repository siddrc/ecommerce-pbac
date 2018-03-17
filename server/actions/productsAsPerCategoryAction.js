var router = require('express').Router();
var productsController = require("../controllers/productsController");
const uuidV1 = require('uuid/v1');
var path = require('path');
var ObjectID = require('mongodb').ObjectID;
router.get("/", function(req, res) {
    var skip = parseInt(req.query.skip);
    var limit = parseInt(req.query.limit);
    var category = req.query.category;
    productsController.getAsPerCategory(category,skip,limit,function(response) {
        res.send(response);
    });
})
router.get("/totalCount", function(req, res) {
    var category = req.query.category;
    productsController.getTotalCountOfCategory(category,function(response) {
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
