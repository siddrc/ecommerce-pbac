var exports = module.exports = {};
var database = require("../database/database");
exports.get = function(actionCallBackFunction) {
    var policyMasterDbModel = {};
    policyMasterDbModel.collectionName = "policymaster";
    policyMasterDbModel.dbData = {};
    policyMasterDbModel.dbData.criteria = {}
    policyMasterDbModel.dbData.projection = {
        "name": 1,
        "_id": 0
    }
    policyMasterDbModel.callback = actionCallBackFunction;
    database.read(policyMasterDbModel);
}
