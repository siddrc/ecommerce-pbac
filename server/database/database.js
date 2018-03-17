'use strict'
var exports = module.exports = {};
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ecommercedb";

function databaseConnect(dbCRUDParams, handleCRUD) {
    MongoClient.connect(url, function(connectionError, databaseConnection) {
        connectionError ? handleConnectionError(connectionError, dbCRUDParams) : handleCRUD(databaseConnection, dbCRUDParams);
    });
}

function handleConnectionError(connectionError, dbCRUDParams) {
    var responseObject = { "error": connectionError, "result": null }
    dbCRUDParams.callback(responseObject);
}
exports.create = function(dbCreateParams) {
    databaseConnect(dbCreateParams, handleDataCreate);
}

function handleDataCreate(databaseConnection, dbCreateParams) {
    var collection = databaseConnection.collection(dbCreateParams.collectionName);
    collection.insert(dbCreateParams.dbData, function(err, result) {
        var responseObject = { "error": err, "result": result }
        databaseConnection.close();
        dbCreateParams.callback(responseObject);
    });
}
exports.insertMany = function(dbCreateParams) {
    databaseConnect(dbCreateParams, handleDataInsertMany);
}

function handleDataInsertMany(databaseConnection, dbCreateParams) {
    var collection = databaseConnection.collection(dbCreateParams.collectionName);
    collection.insertMany(dbCreateParams.dbData, function(err, result) {
        var responseObject = { "error": err, "result": result }
        databaseConnection.close();
        dbCreateParams.callback(responseObject);
    });
}
exports.read = function(dbReadParams) {
    databaseConnect(dbReadParams, handleDataRead);
};

function handleDataRead(databaseConnection, dbReadParams) {
    var projection = dbReadParams.dbData.projection;
    var criteria = dbReadParams.dbData.criteria;
    var options = dbReadParams.dbData.options;
    var collectionName = dbReadParams.collectionName;
    var callback = dbReadParams.callback;
    var collection = databaseConnection.collection(collectionName);
    collection.find(criteria, projection, options).toArray(
        function(err, result) {
            var responseObject = { "error": err, "result": result };
            databaseConnection.close();
            callback(responseObject);
        });
}
exports.readAndSort = function(dbReadParams) {
    databaseConnect(dbReadParams, handleDataReadAndSort);
};

function handleDataReadAndSort(databaseConnection, dbReadParams) {
    var projection = dbReadParams.dbData.projection;
    var criteria = dbReadParams.dbData.criteria;
    var options = dbReadParams.dbData.options;
    var collectionName = dbReadParams.collectionName;
    var callback = dbReadParams.callback;
    var sort = dbReadParams.dbData.sort;
    var collection = databaseConnection.collection(collectionName);
    collection.find(criteria, projection, options).sort(sort).toArray(function(err, result) {
        var responseObject = { "error": err, "result": result };
        databaseConnection.close();
        callback(responseObject);
    });
}
exports.readOne = function(dbReadOneParams) {
    databaseConnect(dbReadOneParams, handleDataReadOne);
}

function handleDataReadOne(databaseConnection, dbReadParams) {
    var projection = dbReadParams.dbData.projection;
    var criteria = dbReadParams.dbData.criteria;
    var options = dbReadParams.dbData.options;
    var collectionName = dbReadParams.collectionName;
    var callback = dbReadParams.callback;
    var collection = databaseConnection.collection(collectionName);
    collection.findOne(criteria, projection, options, function(err, result) {
        var responseObject = { "error": err, "result": result };
        databaseConnection.close();
        callback(responseObject);
    });
}
exports.count = function(dbCountParams) {
    databaseConnect(dbCountParams, handleDataCount);
}

function handleDataCount(databaseConnection, dbCountParams) {
    var criteria = dbCountParams.dbData.criteria;
    var projection = dbCountParams.dbData.projection;
    var options = dbCountParams.dbData.options;
    var callback = dbCountParams.callback;
    var collectionName = dbCountParams.collectionName;
    var collection = databaseConnection.collection(collectionName);
    collection.find(criteria, projection, options).count(function(err, result) {
        var responseObject = { "error": err, "result": result };
        databaseConnection.close();
        callback(responseObject);
    });
}
exports.update = function(dbUpdateParams) {
    databaseConnect(dbUpdateParams, handleUpdate);
}

function handleUpdate(databaseConnection, dbUpdateParams) {
    var criteria = dbUpdateParams.dbData.criteria;
    var update = dbUpdateParams.dbData.update;
    var options = dbUpdateParams.dbData.options;
    var collectionName = dbUpdateParams.collectionName;
    var callback = dbUpdateParams.callback;
    var collection = databaseConnection.collection(collectionName);
    collection.update(criteria, update, options, function(err, result) {
        var responseObject = { "error": err, "result": result };
        databaseConnection.close();
        callback(responseObject);
    });
}
exports.delete = function(dbDeleteParams) {
    databaseConnect(dbDeleteParams, handleDelete);
}

function handleDelete(databaseConnection, dbDeleteParams) {
    var criteria = dbDeleteParams.dbData.criteria;
    var collectionName = dbDeleteParams.collectionName;
    var callback = dbDeleteParams.callback;
    var collection = databaseConnection.collection(collectionName);
    collection.remove(criteria, function(err, result) {
        var responseObject = { "error": err, "result": result };
        databaseConnection.close();
        callback(responseObject);
    });
}
exports.aggregate = function(dbAggregateParams) {
    databaseConnect(dbAggregateParams, handleAggregate);
}

function handleAggregate(databaseConnection, dbAggregateParams) {
    var aggregateStages = dbAggregateParams.dbData.aggregateStages;
    var collectionName = dbAggregateParams.collectionName;
    var callback = dbAggregateParams.callback;
    var collection = databaseConnection.collection(collectionName);
    collection.aggregate(aggregateStages, function(err, result) {
        var responseObject = { "error": err, "result": result };
        databaseConnection.close();
        callback(responseObject);
    });
}
exports.aggregateWithMatchAndGroup = function(dbAggregateParams) {
    databaseConnect(dbAggregateParams, handleAggregateWithMatchAndGroup);
}

function handleAggregateWithMatchAndGroup(databaseConnection, dbAggregateParams) {
    var match = dbAggregateParams.dbData.match;
    var group = dbAggregateParams.dbData.group;
    var collectionName = dbAggregateParams.collectionName;
    var callback = dbAggregateParams.callback;
    var collection = databaseConnection.collection(collectionName);
    collection.aggregate([{
        $match: match
    }, {
        $group: group
    }], function(err, result) {
        var responseObject = { "error": err, "result": result };
        databaseConnection.close();
        callback(responseObject);
    });
}
exports.aggregateWithParams = function(dbAggregateParams) {
    databaseConnect(dbAggregateParams, handleAggregateWithParams);
}

function handleAggregateWithParams(databaseConnection, dbAggregateParams) {
    var match = dbAggregateParams.dbData.match;
    var group = dbAggregateParams.dbData.group;
    var project = dbAggregateParams.dbData.project;
    var sort = dbAggregateParams.dbData.sort;
    var collectionName = dbAggregateParams.collectionName;
    var callback = dbAggregateParams.callback;
    var collection = databaseConnection.collection(collectionName);
    collection.aggregate([{
        $match: match
    }, {
        $group: group
    }, {
        $project: project
    }, {
        $sort: sort
    }], function(err, result) {
        var responseObject = { "error": err, "result": result };
        databaseConnection.close();
        callback(responseObject);
    });
}
exports.dbMapReducer = function(mapReduceObj) {
    databaseConnect(mapReduceObj, handleDbMapReducer);
}

function handleDbMapReducer(databaseConnection, mapReduceObj) {
    var collectionName = mapReduceObj.collectionName;
    var map = mapReduceObj.map;
    var reduce = mapReduceObj.reduce;
    var options = mapReduceObj.options;
    var callback = mapReduceObj.callback;
    var collection = databaseConnection.collection(collectionName);
    collection.mapReduce(map, reduce, options, function(err, tempCollection) {
        var responseObject = { "error": err, "result": result };
        databaseConnection.close();
        callback(responseObject);
    });
}
exports.dropCollection = function(dropCollectionParams) {
    databaseConnect(dropCollectionParams, handleDropCollection);
}

function handleDropCollection(databaseConnection, dropCollectionParams) {
    var collectionName = dropCollectionParams.collectionName;
    databaseConnection.dropCollection(collectionName, function(err, result) {
        var responseObject = { "error": err, "result": result };
        databaseConnection.close();
        callback(responseObject);
    });
}
exports.readSortSkipLimit = function(dbReadSortSkipLimitParams) {
    databaseConnect(dbReadSortSkipLimitParams, handleDataReadSortSkipLimit);
};

function handleDataReadSortSkipLimit(databaseConnection, dbReadSortSkipLimitParams) {
    var projection = dbReadSortSkipLimitParams.dbData.projection;
    var criteria = dbReadSortSkipLimitParams.dbData.criteria;
    var options = dbReadSortSkipLimitParams.dbData.options;
    var collectionName = dbReadSortSkipLimitParams.collectionName;
    var callback = dbReadSortSkipLimitParams.callback;
    var skip = dbReadSortSkipLimitParams.dbData.skip;
    var sort = dbReadSortSkipLimitParams.dbData.sort;
    var limit = dbReadSortSkipLimitParams.dbData.limit;
    var collection = databaseConnection.collection(collectionName);
    collection.find(criteria, projection, options).skip(skip).sort(sort).limit(limit).toArray(
        function(collectionError, result) {
            var responseObject = { "error": collectionError, "result": result };
            databaseConnection.close();
            callback(responseObject);
        });
}
