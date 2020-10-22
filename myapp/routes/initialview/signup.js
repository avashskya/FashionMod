var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var { check, validationResult } = require("express-validator");
const con = require("../databaseRouter/connection");
router.get("/", (req, res, next) => {
  res.render("signup");
});
router.post(
  "/",
  [
    check("Sname", "Should have minimal 3 characters")
      .isLength({
        min: "3",
        max: "30"
      })
      .isAlpha(),

    check("Semail", "Should be a valid email").isEmail(),
    check("Saddress", "Shoud contain at least 10 Alphabetes").isLength({
      min: 10,
      max: 30
    }),
    check("Susername", "Should have Six alphanueric characters")
      .isAlphanumeric()
      .isLength({ min: 6, max: 30 }),
    check("Sphoneno", "Shoul contain only numbers").isMobilePhone(),
    check("pass", "Sholid have Six alphanueric characters")
      .isAlphanumeric()
      .isLength({ min: 6, max: 18 }),
    check("conpass", "Shold be equal to password").custom(
      (value, { req }) => value === req.body.pass
    )
  ],
  (req, res, next) => {
    const error = validationResult(req);
    let data = req.body;
    if (!error.isEmpty()) {
      console.log(error.mapped());
      res.render("signup", {
        err: error.mapped(),
        data: data
      });
    } else {
      bcrypt.genSalt(5, function(err, salt) {
        bcrypt.hash(data.pass, salt, (err, hash) => {
          data.pass = hash;

          con.db.query(
            `select * from  user_info where USERNAME="${data.Susername}"`,
            (err, result) => {
              if (err) {
                console.err(err);
              }
              if (result.length) {
                res.render("signup", { msg: "Error" });
              } else {
                con.db.query(
                  `INSERT INTO user_info (
            NAME,
            EMAIL,
            ADDRESS,
            USERNAME,
            PHONENO,
            PASSWORD,
            TYPE
            )
          VALUES
            ("${data.Sname}","${data.Semail}","${data.Saddress}","${data.Susername}","${data.Sphoneno}","${data.pass}","2");`,
                  (err, result) => {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log("New user was added");
                      res.redirect("/login");
                    }
                  }
                );
              }
            }
          );
        });
      });
    }
  }
);

module.exports = router;
