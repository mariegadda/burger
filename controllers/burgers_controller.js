var express = require("express");
var router = express.Router();

//imports the model, burger.js to use its database functions
var burger = require("../models/burger.js");

//create all routes and set up logic within these routes where required

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  burger.create([
    "burger_name", 
  ], [
    req.body.name, 
  ], function() {
    res.redirect("/");
  });
});

router.put("/id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});


module.exports = router;