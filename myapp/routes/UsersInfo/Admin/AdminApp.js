var express = require("express");
var router = express.Router();
var addProducts = require("./AddProducts");

/* GET home page. */
router.use("/addProducts", addProducts);

// showProducts.signupData();
module.exports = router;
