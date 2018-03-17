var exports = module.exports = {};
var database = require("../database/database");
exports.get = function(actionCallBackFunction) {
    var menuDbModel = {};
    menuDbModel.collectionName = "menu";
    menuDbModel.dbData = {};
    menuDbModel.dbData.criteria = {};
    menuDbModel.dbData.projection = {"_id": 0};
    menuDbModel.callback = actionCallBackFunction;
    database.read(menuDbModel);
}