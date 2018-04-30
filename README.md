# ecommerce-pbac 
#### Following is the starter mongodb script, which pumps data to mongodb.
```javascript
use ecommercedb
db.policies.insertMany([
{
    "_id" : ObjectId("5ae6fb86b7aa8068d7749c1e"),
    "name" : "Admin",
    "policy" : {
        "Products" : {
            "isWrite" : "Y",
            "isDelete" : "Y",
            "isRead" : "Y"
        },
        "Categories" : {
            "isWrite" : "Y",
            "isDelete" : "Y",
            "isRead" : "Y"
        },
        "Policies" : {
            "isWrite" : "Y",
            "isDelete" : "Y",
            "isRead" : "Y"
        },
        "AdminUser" : {
            "isWrite" : "Y",
            "isDelete" : "Y",
            "isRead" : "Y"
        },
        "Customers" : {
            "isWrite" : "Y",
            "isDelete" : "Y",
            "isRead" : "Y"
        }
    }
}
,
{
    "_id" : ObjectId("58b2cbcb616e9a49e091812f"),
    "name" : "Customer",
    "policy" : {
        "Products" : {
            "isRead" : "Y",
            "isWrite" : "N",
            "isDelete" : "N"
        },
        "Categories" : {
            "isRead" : "Y",
            "isWrite" : "N",
            "isDelete" : "N"
        },
        "Orders" : {
            "isRead" : "Y",
            "isWrite" : "N",
            "isDelete" : "N"
        },
        "Policies" : {
            "isRead" : "N",
            "isWrite" : "N",
            "isDelete" : "N"
        },
        "AdminUser" : {
            "isRead" : "N",
            "isWrite" : "N",
            "isDelete" : "N"
        },
        "Customers" : {
            "isRead" : "N",
            "isWrite" : "N",
            "isDelete" : "N"
        },
        "Merchants" : {
            "isRead" : "N",
            "isWrite" : "N",
            "isDelete" : "N"
        }
    }
}
,
{
    "_id" : ObjectId("58dacecdbfe7e52878b0091a"),
    "name" : "Merchant",
    "policy" : {
        "Products" : {
            "isWrite" : "Y",
            "isDelete" : "Y",
            "isRead" : "Y"
        },
        "Categories" : {
            "isRead" : "Y",
            "isWrite" : "Y",
            "isDelete" : "Y"
        },
        "Policies" : {
            "isRead" : "N",
            "isWrite" : "N",
            "isDelete" : "N"
        },
        "AdminUser" : {
            "isRead" : "N",
            "isWrite" : "N",
            "isDelete" : "N"
        },
        "Customers" : {
            "isRead" : "N",
            "isWrite" : "N",
            "isDelete" : "N"
        },
        "Orders" : {
            "isRead" : "N",
            "isWrite" : "N",
            "isDelete" : "N"
        },
        "Merchants" : {
            "isRead" : "N",
            "isWrite" : "N",
            "isDelete" : "N"
        }
    }
}])
db.policymaster.insertMany([
{
    "_id" : ObjectId("5ae706fcb7aa8068d7749f89"),
    "name" : "Products"
}
,
{
    "_id" : ObjectId("5ae7071bb7aa8068d7749f9d"),
    "name" : "Categories"
}
,
{
    "_id" : ObjectId("5ae707bbb7aa8068d774a016"),
    "name" : "Policies"
}
,
{
    "_id" : ObjectId("5ae707cbb7aa8068d774a020"),
    "name" : "AdminUser"
}
,
{
    "_id" : ObjectId("5ae707dab7aa8068d774a02f"),
    "name" : "Customers"
}
,
{
    "_id" : ObjectId("5ae707e9b7aa8068d774a039"),
    "name" : "Orders"
}
,
{
    "_id" : ObjectId("5ae707fcb7aa8068d774a044"),
    "name" : "Merchants"
}
])
db.policymasterpermissiontypes.insertMany([
{
    "_id" : ObjectId("5ae6fe32b7aa8068d7749c64"),
    "name" : "isRead"
}
,
{
    "_id" : ObjectId("5ae6fe3bb7aa8068d7749c66"),
    "name" : "isWrite"
}
,
{
    "_id" : ObjectId("5ae6fe42b7aa8068d7749c68"),
    "name" : "isDelete"
}
])
db.users.insertMany([
{
    "_id" : ObjectId("5ae700a4b7aa8068d7749ceb"),
    "name" : "admin",
    "email" : "admin@email.com",
    "password" : "password@123",
    "policyId" : ObjectId("5ae6fb86b7aa8068d7749c1e"),
    "isCustomer" : false,
    "isMerchant" : false
}
,
{
    "_id" : ObjectId("5ae70b41bf1ed65dcd6e4c58"),
    "name" : "merchant1",
    "email" : "merchant@email.com",
    "password" : "password@123",
    "isCustomer" : false,
    "isMerchant" : true,
    "policyId" : ObjectId("58dacecdbfe7e52878b0091a")
}
,
{
    "_id" : ObjectId("5ae74d70277a166e073528ba"),
    "name" : "customer1",
    "email" : "customer1@email.com",
    "password" : "password@123",
    "isCustomer" : true,
    "isMerchant" : false,
    "policyId" : ObjectId("58b2cbcb616e9a49e091812f")
}
])
```