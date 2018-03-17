var exports = module.exports = {};
var database = require("../database/database");
var ObjectID = require('mongodb').ObjectID;
exports.create = function(category, actionCallBackFunction) {
    var categoryDbData = {
        name: category.name
    }
    var categoryDbModel = {};
    categoryDbModel.collectionName = "categories";
    categoryDbModel.dbData = categoryDbData;
    categoryDbModel.callback = actionCallBackFunction;
    database.create(categoryDbModel)
}
exports.get = function(actionCallBackFunction) {
    var criteria = {};
    var projection = {};
    var options = {};
    var categoryDbData = {
        criteria: criteria,
        projection: projection,
        options: options
    }
    var categoryDbModel = {};
    categoryDbModel.collectionName = "categories";
    categoryDbModel.dbData = categoryDbData;
    categoryDbModel.callback = actionCallBackFunction;
    database.read(categoryDbModel)
}
exports.getCategory = function(categoryId, actionCallBackFunction) {
    var criteria = {
        _id: new ObjectID(categoryId)
    };
    var projection = {};
    var options = {};
    var categoryDbData = {
        criteria: criteria,
        projection: projection,
        options: options
    }
    var categoryDbModel = {};
    categoryDbModel.collectionName = "categories";
    categoryDbModel.dbData = categoryDbData;
    categoryDbModel.callback = actionCallBackFunction;
    database.readOne(categoryDbModel)
}
exports.update = function(category, actionCallBackFunction) {
    var criteria = {
        _id: new ObjectID(category.id)
    };
    var update = {
        $set: {
            name: category.name
        }
    };
    var options = { multi: false };
    var categoryDbData = {
        criteria: criteria,
        update: update,
        options: options
    }
    var categoryDbModel = {};
    categoryDbModel.collectionName = "categories";
    categoryDbModel.dbData = categoryDbData;
    categoryDbModel.callback = actionCallBackFunction;
    database.update(categoryDbModel)
}
exports.delete = function(categoryId,actionCallBackFunction){
    var criteria = {
        _id: new ObjectID(categoryId)
    };
    var categoryDbData = {
        criteria: criteria
    }
    var categoryDbModel = {};
    categoryDbModel.collectionName = "categories";
    categoryDbModel.dbData = categoryDbData;
    categoryDbModel.callback = actionCallBackFunction;
    database.delete(categoryDbModel)
}
