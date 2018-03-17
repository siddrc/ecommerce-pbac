var exports = module.exports = {};
var database = require("../database/database");
var ObjectID = require('mongodb').ObjectID;
exports.create = function(product, actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    productsDbModel.dbData = product;
    productsDbModel.callback = actionCallBackFunction;
    database.create(productsDbModel);
}
exports.updateWithImageName = function(productImageObj, actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    var dbData = {};
    dbData.criteria = {
        _id: productImageObj.productId
    };
    dbData.update = {
        "$set": {
            "image": productImageObj.productImageFileName
        }
    };
    dbData.options = {
        multi: false
    }
    productsDbModel.dbData = dbData;
    productsDbModel.callback = actionCallBackFunction;
    database.update(productsDbModel);
}
exports.get = function(skip, limit, actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    var dbData = {};
    dbData.criteria = {};
    dbData.projection = {};
    dbData.options = {};
    dbData.skip = skip;
    dbData.limit = limit;
    dbData.sort = { name: 1 };
    productsDbModel.dbData = dbData;
    productsDbModel.callback = actionCallBackFunction;
    database.readSortSkipLimit(productsDbModel);
}
exports.getAsPerCategory = function(category, skip, limit, actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    var dbData = {};
    dbData.criteria = {
        category: new ObjectID(category)
    };
    dbData.projection = {};
    dbData.options = {};
    dbData.skip = skip;
    dbData.limit = limit;
    dbData.sort = { name: 1 };
    productsDbModel.dbData = dbData;
    productsDbModel.callback = actionCallBackFunction;
    database.readSortSkipLimit(productsDbModel);
}
exports.getTotalCount = function(actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    var dbData = {};
    dbData.criteria = {};
    dbData.projection = {};
    dbData.options = {};
    productsDbModel.dbData = dbData;
    productsDbModel.callback = actionCallBackFunction;
    database.count(productsDbModel);
};
exports.getTotalCountOfCategory = function(category, actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    var dbData = {};
    dbData.criteria = {
        category: new ObjectID(category)
    };
    dbData.projection = {};
    dbData.options = {};
    productsDbModel.dbData = dbData;
    productsDbModel.callback = actionCallBackFunction;
    database.count(productsDbModel);
};
exports.getByMerchant = function(merchantId, skip, limit, actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    var dbData = {};
    dbData.criteria = {
        merchant: new ObjectID(merchantId)
    };
    dbData.projection = {};
    dbData.options = {};
    dbData.skip = skip;
    dbData.limit = limit;
    dbData.sort = { name: 1 };
    productsDbModel.dbData = dbData;
    productsDbModel.callback = actionCallBackFunction;
    database.readSortSkipLimit(productsDbModel);
}
exports.getTotalCountByMerchant = function(merchantId, actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    var dbData = {};
    dbData.criteria = {
        merchant: new ObjectID(merchantId)
    };
    dbData.projection = {};
    dbData.options = {};
    productsDbModel.dbData = dbData;
    productsDbModel.callback = actionCallBackFunction;
    database.count(productsDbModel);
};
exports.getProductDetails = function(productId, actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    var dbData = {};
    dbData.criteria = {
        "_id": new ObjectID(productId)
    };
    dbData.projection = {};
    dbData.options = {};
    productsDbModel.dbData = dbData;
    productsDbModel.callback = actionCallBackFunction;
    database.readOne(productsDbModel);
};
exports.delete = function(productId, actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    var dbData = {};
    dbData.criteria = {
        "_id": new ObjectID(productId)
    };
    productsDbModel.dbData = dbData;
    productsDbModel.callback = actionCallBackFunction;
    database.delete(productsDbModel);
};
exports.checkIfMerchantStillHasProducts = function(merchant, actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    var dbData = {};
    dbData.criteria = {
        merchant: merchant._id
    };
    dbData.projection = {};
    dbData.options = {};
    productsDbModel.dbData = dbData;
    productsDbModel.callback = actionCallBackFunction;
    database.count(productsDbModel);
}
exports.checkIfThisCategoryHasProducts = function(categoryId, actionCallBackFunction) {
    var productsDbModel = {};
    productsDbModel.collectionName = "products";
    var dbData = {};
    dbData.criteria = {
        category: new ObjectID(categoryId)
    };
    dbData.projection = {};
    dbData.options = {};
    productsDbModel.dbData = dbData;
    productsDbModel.callback = actionCallBackFunction;
    database.count(productsDbModel);
}
