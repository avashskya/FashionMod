var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var { check, validationResult } = require("express-validator");
const con = require("../databaseRouter/connection");
router.get("/", (req, res, next) => {
  res.render("signup");
});
router.post("/", (req, res, next) => {
  let data = req.body;
  con.db.query(
    `select USERNAME from User_info where USERNAME = "${data.Lusername}"`,
    (error, result) => {
      if (error) {
        console.log(error);
        res.render("signup", { err: error });
      } else {
        if (result.length) {
          con.db.query(
            `select * from User_info where USERNAME = "${data.Lusername}"`,
            (err, passwordResult) => {
              if (err) {
                console.error(err);
              } else {
                if (passwordResult[0]) {
                  const pass = passwordResult[0].PASSWORD;
                  bcrypt.compare(data.pass, pass, (err, success) => {
                    if (success) {
                      req.session.userName = passwordResult[0].USERNAME;
                      req.session.type = passwordResult[0].TYPE;
                      req.session.email = passwordResult[0].EMAIL;
                      req.session.ids = passwordResult[0].U_ID;

                      res.redirect("/Sessionhome");
                    } else {
                      res.render("signup", {
                        msg: "Could not find username of password"
                      });
                    }
                  });
                }
              }
            }
          );
        } else {
          res.render("signup", { msg: "Could not find username of password" });
        }
      }
    }
  );
});
module.exports = router;
