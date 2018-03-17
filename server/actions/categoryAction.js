var router = require('express').Router();
var categoryController = require("../controllers/categoryController");
var productsController = require("../controllers/productsController");
router.post('/', function(req, res) {
    var category = req.body.category;
    categoryController.create(category, function(response) {
        res.send(response);
    })
});
router.get('/', function(req, res) {
    var category = req.body.category;
    categoryController.get(function(response) {
        res.send(response);
    })
});
router.get('/detail', function(req, res) {
    var categoryId = req.query.categoryId;
    categoryController.getCategory(categoryId, function(response) {
        res.send(response);
    })
});
router.put("/", function(req, res) {
    var category = req.body.category;
    categoryController.update(category, function(response) {
        res.send(response);
    })
});
router.delete("/:categoryId", function(req, res) {
    var categoryId = req.params.categoryId;
    productsController.checkIfThisCategoryHasProducts(categoryId, function(response) {
        if(response.result === 0){
            categoryController.delete(categoryId, function(response) {
            response.msg = "No products in this category, hence delete successful."    
            res.send(response);
        })
        }else{
            var response = {};
            response.msg = "Products still present in this category, hence delete not successful."
            res.status(500).send(response)
        }
        
    })

})
module.exports = router;
