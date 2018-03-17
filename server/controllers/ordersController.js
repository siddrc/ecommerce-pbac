var exports = module.exports = {};
var database = require("../database/database");
var ObjectID = require('mongodb').ObjectID;
exports.create = function(order, actionCallBackFunction) {
    order.productId = new ObjectID(order.productId);
    var orderDbModel = {};
    orderDbModel.collectionName = "orders";
    orderDbModel.dbData = order;
    orderDbModel.callback = actionCallBackFunction;
    database.create(orderDbModel)
};
exports.get = function(orderId, actionCallBackFunction) {
    var orderDbModel = {};
    orderDbModel.collectionName = "orders";
    orderDbModel.dbData = {};
    var dbData = {};
    dbData.criteria = {
        _id: new ObjectID(orderId)
    }
    orderDbModel.dbData = dbData;
    orderDbModel.callback = actionCallBackFunction;
    database.readOne(orderDbModel)
}
exports.getAll = function(actionCallBackFunction) {
    var orderDbModel = {};
    orderDbModel.collectionName = "orders";
    orderDbModel.dbData = {};
    var dbData = {};
    dbData.criteria = {}
    orderDbModel.dbData = dbData;
    orderDbModel.callback = actionCallBackFunction;
    database.read(orderDbModel)
}
exports.update = function(order, actionCallBackFunction) {
    var orderDbModel = {};
    orderDbModel.collectionName = "orders";
    orderDbModel.dbData = {};
    var dbData = {};
    dbData.criteria = {
        "_id": new ObjectID(order.id)
    };
    dbData.update = {
        "$set": {
            "deliveryAddress": order.deliveryAddress,
            "comments": order.comments,
            "complete" : "Yes"
        }
    };
    dbData.options = {
        multi: false
    }
    orderDbModel.dbData = dbData;
    orderDbModel.callback = actionCallBackFunction;
    database.update(orderDbModel)
}
exports.delete = function(orderId,actionCallBackFunction){
    var orderDbModel = {};
    orderDbModel.collectionName = "orders";
    orderDbModel.dbData = {};
    var dbData = {};
    dbData.criteria = {
        "_id": new ObjectID(orderId)
    };
    orderDbModel.dbData = dbData;
    orderDbModel.callback = actionCallBackFunction;
    database.delete(orderDbModel)
}
exports.checkIfProductIsInActiveOrder = function(productId,actionCallBackFunction){
    var orderDbModel = {};
    orderDbModel.collectionName = "orders";
    orderDbModel.dbData = {};
    var dbData = {};
    dbData.criteria = {
        productId: new ObjectID(productId)
    }
    orderDbModel.dbData = dbData;
    orderDbModel.callback = actionCallBackFunction;
    database.count(orderDbModel)
}
exports.checkIfCustomerStillHasOrders = function(customer,actionCallBackFunction){
    var orderDbModel = {};
    orderDbModel.collectionName = "orders";
    orderDbModel.dbData = {};
    var dbData = {};
    dbData.criteria = {
        userId: customer._id
    }
    orderDbModel.dbData = dbData;
    orderDbModel.callback = actionCallBackFunction;
    database.count(orderDbModel)
}