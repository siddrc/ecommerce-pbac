var exports = module.exports = {};
var database = require("../database/database");
exports.get = function(actionCallBackFunction) {
    var policyMasterPermissionTypesDbModel = {};
    policyMasterPermissionTypesDbModel.collectionName = "policymasterpermissiontypes";
    policyMasterPermissionTypesDbModel.dbData = {};
    policyMasterPermissionTypesDbModel.dbData.criteria = {}
    policyMasterPermissionTypesDbModel.dbData.projection = {
        "name": 1,
        "_id": 0
    }
    policyMasterPermissionTypesDbModel.callback = actionCallBackFunction;
    database.read(policyMasterPermissionTypesDbModel);
}