var express = require("express");
var router = express.Router();
var con = require("./databaseRouter/connection");

/* GET home page. */
router.get("/", function(req, res, next) {
  con.db.query(`SELECT * FROM ADMIN_CART`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("The result from database ");
      console.log(result[0]);
      results = result;
      res.json({
        data: results,
      });
    }
  });
});

module.exports = router;
