/*

This is the server side entry point for the application

$>node app.js

This is the command we run on the command line, to start the application.
And Node.js runtime loads all the required libraries and routes..
These routes are ajax URLs which the clientside-angularjs would be requesting to.


*/

console.log("Starting server...");
console.log("Initiate URL mapping....");
var express = require('express');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var welcomePageAction = require("./server/actions/welcomePageAction");
var usersAction = require("./server/actions/usersAction");
var policyAction = require("./server/actions/policyAction");
var menuAction = require("./server/actions/menuAction");
var policyMasterAction = require("./server/actions/policyMasterAction");
var policyMasterPermissionTypesAction = require("./server/actions/policyMasterPermissionTypesAction");
var categoryAction = require("./server/actions/categoryAction");
var productsAction = require("./server/actions/productsAction");
var ordersAction = require("./server/actions/ordersAction");
var productsAsPerCategoryAction = require("./server/actions/productsAsPerCategoryAction");
var merchantProductsAction = require("./server/actions/merchantProductsAction");
var app = express();
app.use(fileUpload());
var session = require('express-session');
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));
app.use(session({
    secret: '123456secretkey',
    resave: false,
    saveUninitialized: false
}));
app.listen(3000); //this is the http port at which the application will be listening to..
//http://localhost:3000/<-----GET
app.use('/', welcomePageAction);
app.use('/users', usersAction);
app.use('/policy', policyAction);
app.use('/menu', menuAction);
app.use('/category',categoryAction);
app.use('/ajax/policyMaster', policyMasterAction);
app.use('/ajax/policyMasterPermissionTypes', policyMasterPermissionTypesAction);
app.use('/ajax/policy', policyAction);
app.use('/ajax/adminUsers', usersAction);
app.use('/ajax/category', categoryAction);
app.use('/ajax/products', productsAction);
app.use('/products', productsAction);
app.use('/productsAsPerCategory',productsAsPerCategoryAction);
app.use('/ajax/orders', ordersAction);
app.use('/ajax/users', usersAction);
app.use('/ajax/merchant/products',merchantProductsAction);
app.all("/ajax/*", requireLogin, function(req, res, next) {
    next();
});
console.log("Application now ready to receive requests....");
console.log("Press Ctrl+C to stop the server....");

function requireLogin(req, res, next) {
    if (req.session.isUserLoggedIn) {
        next();
    } else {
        res.status(401).send();
    }
}
