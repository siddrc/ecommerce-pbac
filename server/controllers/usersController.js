var exports = module.exports = {};
var database = require("../database/database");
var ObjectID = require('mongodb').ObjectID;
exports.checkUniqueEmail = function(userInfo, actionCallBackFunction) {
    var usersDbModel = {};
    usersDbModel.collectionName = "users";
    usersDbModel.dbData = {};
    usersDbModel.dbData.criteria = {
        "email": userInfo.userEmail
    };
    usersDbModel.callback = actionCallBackFunction;
    database.count(usersDbModel);
}
exports.authUser = function(userInfo, actionCallBackFunction) {
    var usersDbModel = {};
    usersDbModel.collectionName = "users";
    usersDbModel.dbData = {};
    usersDbModel.dbData.aggregateStages = [];
    usersDbModel.dbData.aggregateStages.push({
        $match: {
            "email": userInfo.userEmail,
            "password": userInfo.userPassword
        }

    });
    usersDbModel.dbData.aggregateStages.push({
        $lookup: {
            from: "policies",
            localField: "policyId",
            foreignField: "_id",
            as: "policy"
        },
    });
    usersDbModel.dbData.aggregateStages.push({
        $project: {
            "_id": 1,
            "name": 1,
            "policy": 1,
            "isCustomer": 1,
            "isMerchant": 1
        }
    });
    usersDbModel.callback = actionCallBackFunction;
    database.aggregate(usersDbModel);
}
exports.create = function(user, actionCallBackFunction) {
    var usersDbModel = {};
    usersDbModel.collectionName = "users";
    usersDbModel.dbData = user;
    usersDbModel.callback = actionCallBackFunction;
    database.create(usersDbModel);
}
exports.get = function(user, actionCallBackFunction) {
    var usersDbModel = {};
    usersDbModel.collectionName = "users";
    usersDbModel.dbData = {};
    var dbData = {};
    dbData.criteria = { policyId: user.policyId };
    usersDbModel.dbData = dbData;
    usersDbModel.callback = actionCallBackFunction;
    database.read(usersDbModel);
}
exports.getDetail = function(user, actionCallBackFunction) {
    var usersDbModel = {};
    usersDbModel.collectionName = "users";
    usersDbModel.dbData = {};
    var dbData = {};
    dbData.criteria = { _id: user._id };
    usersDbModel.dbData = dbData;
    usersDbModel.callback = actionCallBackFunction;
    database.readOne(usersDbModel);
}
exports.checkIfUserAssociatedWithThisPolicy = function(policyId, callback) {
    var usersDbModel = {};
    usersDbModel.collectionName = "users";
    usersDbModel.dbData = {};
    usersDbModel.dbData.criteria = {
        "policyId": new ObjectID(policyId)
    }
    usersDbModel.callback = callback;
    database.count(usersDbModel);

}
exports.delete = function(user, callback) {
    var usersDbModel = {};
    usersDbModel.collectionName = "users";
    usersDbModel.dbData = {};
    usersDbModel.dbData.criteria = {
        "_id": new ObjectID(user._id)
    }
    usersDbModel.callback = callback;
    database.delete(usersDbModel);
}
exports.getOnlyAdminUsers = function(actionCallBackFunction) {
    var usersDbModel = {};
    usersDbModel.collectionName = "users";
    usersDbModel.dbData = {};
    var dbData = {};
    dbData.criteria = {
        "isCustomer": false,
        "isMerchant": false
    };
    usersDbModel.dbData = dbData;
    usersDbModel.callback = actionCallBackFunction;
    database.read(usersDbModel);
}
