var exports = module.exports = {};
var database = require("../database/database");
var underscore = require("underscore");
var ObjectID = require('mongodb').ObjectID;
exports.get = function(policy, actionCallBackFunction) {
    var policyDbModel = {};
    policyDbModel.collectionName = "policies";
    policyDbModel.dbData = {};
    policyDbModel.dbData.criteria = {
        "name": policy.name
    }
    policyDbModel.dbData.projection = {
        "policy": 1,
        "_id": 0
    }
    policyDbModel.callback = actionCallBackFunction;
    database.readOne(policyDbModel);
}
exports.create = function(policyDetails, actionCallBackFunction) {
    var policy = {
        name: policyDetails.policyName,
        policy: getPolicy(policyDetails)
    }
    var policyDbModel = {};
    policyDbModel.collectionName = "policies";
    policyDbModel.dbData = policy;
    policyDbModel.callback = actionCallBackFunction;
    database.create(policyDbModel)
}

function getPolicy(policyDetails) {
    var policy = {};
    var policyMaster = policyDetails.policyMaster;
    var policyMasterPermissionTypes = policyDetails.policyMasterPermissionTypes;
    var originalArray = [];
    originalArray = getOriginalArray(policyMaster, policyMasterPermissionTypes);
    var permissionsArray = policyDetails.permissionsArray;
    var commonElems = underscore.intersection(permissionsArray, originalArray);
    var differentElems = underscore.difference(originalArray, commonElems);
    policy = getPolicyFromElements(commonElems, policy, "Y");
    policy = getPolicyFromElements(differentElems, policy, "N");
    return policy;
}

function getPolicyFromElements(elems, policy, flag) {
    var policyClone = policy;
    elems.forEach(function(element) {
        var elements = element.split("|");
        if (!policyClone.hasOwnProperty(elements[0])) {
            policyClone[elements[0]] = {};
            policyClone[elements[0]][elements[1]] = flag;
        } else
            policyClone[elements[0]][elements[1]] = flag;
    })
    return policyClone;
}

function getOriginalArray(policyMaster, policyMasterPermissionTypes) {
    var originalArray = [];
    policyMaster.forEach(function(policyMasterItem) {
        policyMasterPermissionTypes.forEach(function(policyMasterPermissionTypesItem) {
            var token = policyMasterItem.name + "|" + policyMasterPermissionTypesItem.name;
            originalArray.push(token)
        })
    });
    return originalArray;
}
exports.getAll = function(actionCallBackFunction) {
    var policyDbModel = {};
    policyDbModel.collectionName = "policies";
    policyDbModel.dbData = {};
    policyDbModel.dbData.criteria = {}
    policyDbModel.dbData.projection = {
        "name": 1,
        "_id": 1
    }
    policyDbModel.callback = actionCallBackFunction;
    database.read(policyDbModel);
}
exports.getDetail = function(policyId, actionCallBackFunction) {
    var policyDbModel = {};
    policyDbModel.collectionName = "policies";
    policyDbModel.dbData = {};
    policyDbModel.dbData.criteria = {
        "_id": new ObjectID(policyId)
    }
    policyDbModel.dbData.projection = {
        "policy": 1,
        "name": 1,
        "_id": 0
    }
    policyDbModel.callback = actionCallBackFunction;
    database.readOne(policyDbModel);
}
exports.update = function(policyDetails, actionCallBackFunction) {
    var policy = {
        name: policyDetails.policyName,
        policy: getPolicy(policyDetails)
    }
    var policyDbModel = {};
    policyDbModel.collectionName = "policies";
    policyDbModel.dbData = {};
    policyDbModel.dbData.criteria = {
        "_id": new ObjectID(policyDetails.policyId)
    }
    policyDbModel.dbData.update = {
        $set: {
            name: policyDetails.policyName,
            policy: getPolicy(policyDetails)
        }
    }
    policyDbModel.callback = actionCallBackFunction;
    database.update(policyDbModel)
}

exports.delete = function(policyId,actionCallBackFunction) {
    var policyDbModel = {};
    policyDbModel.collectionName = "policies";
    policyDbModel.dbData = {};
    policyDbModel.dbData.criteria = {
        "_id": new ObjectID(policyId)
    }
    policyDbModel.callback = actionCallBackFunction;
    database.delete(policyDbModel)
}
