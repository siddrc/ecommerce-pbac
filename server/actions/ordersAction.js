var router = require('express').Router();
var ordersController = require("../controllers/ordersController");
var ObjectID = require('mongodb').ObjectID;
router.post('/', function(req, res) {
    var order = req.body.order;
    var orderId = new ObjectID()
    order.userId = new ObjectID(req.session.userId);
    order.name = req.session.loggedInUserName+ " ordered "+order.productName
    order._id = orderId;
    ordersController.create(order, function(orderId) {
        res.send(order._id);
    })
});
router.get("/", function(req, res) {
    var orderId = req.query.id;
    ordersController.get(orderId, function(response) {
        res.send(response);
    })
});
router.get("/all", function(req, res) {
    ordersController.getAll(function(response) {
        res.send(response);
    })
});
router.put("/",function(req,res){
    var order = req.body.order;
    ordersController.update(order,function(response){
        res.send("");
    })
});
router.delete("/:orderId",function(req,res){
    var orderId = req.params.orderId;
    ordersController.delete(orderId,function(response){
        res.send("");
    })
})
module.exports = router;
