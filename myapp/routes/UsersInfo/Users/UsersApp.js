var express = require("express");
var router = express.Router();
const addToCard = require("./AddToCart");
router.use("/addToCard", addToCard);

module.exports = router;
