var router = require('express').Router();
var menuController = require("../controllers/menuController");
router.get('/', function(req, res) {
    menuController.get(function(response) {
        res.send(response);
    })
});
module.exports = router;
