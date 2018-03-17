/*

  This file is called after starting the server, and opening the browser and pointing the browser to url
  http://localhost:3000/

  this loads index.html in the browser, and since it uses angular.js and angular ui-routing
  as soon as index.html loads, the routing takes charge and loads the default view within index.html

  
*/

var router = require('express').Router();
var path = require('path');
var policyController = require("../controllers/policyController");
router.get('/', function(req, res) {
    var policyInfo = {
        name: "Customer"
    }
    policyController.get(policyInfo, function(response) {
        if (req.session.isLoggedIn == undefined || req.session.isLoggedIn == null || req.session.isLoggedIn == "N") {
            req.session.defaultPolicy = response.result;
        }
        res.sendFile('index.html', { root: path.join(__dirname, '../../public/views') });
    });

});
module.exports = router;
