var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var con = require("../../databaseRouter/connection");

const storage = multer.diskStorage({
  destination: "./public/adminImage",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "_" +
        req.session.userName +
        "_" +
        Date.now() +
        "_" +
        path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000000 },
  fileFilter: (req, file, cb) => {
    const filetype = /jpeg|jpg|png|gif/;
    const extname = filetype.test(
      path.extname(file.originalname).toLowerCase(),
    );
    if (extname) {
      return cb(null, true);
    } else {
      cb("Error : Images only cannot upload other file format ");
    }
  },
}).single("AdminImage");

router.post("/", function(req, res, next) {
  upload(req, res, err => {
    if (err) {
      console.log(`an error 101 ${err}`);
      res.render("indexloginView", {
        userName: req.session.userName,
        type: req.session.type,
        Imagerormsg: err,
      });
    } else {
      const data = req.body;
      data.AdminImage = `adminImage/${req.file.filename}`;
      con.db.query(
        `INSERT INTO image (IMAGE_INFO) VALUES ("${data.AdminImage}")`,
        (err, resimage) => {
          if (err) {
            console.err(err);
          } else {
            con.db.query(
              `SELECT MAX(IMAGE_ID) AS IMAGE_ID FROM IMAGE`,
              (err, resultImageId) => {
                if (err) {
                  console.error(err);
                } else {
                  let IId = resultImageId[0].IMAGE_ID;

                  con.db.query(
                    `INSERT INTO products(P_NAME,TYPES, P_SIZE, P_COLOR, QTY, DISCRIPTION ,PRICE, IMAGE_ID         )
            VALUES
              (
                '${data.PName}',
                '${data.PType}',
                '${data.PSize}',
                '${data.PColor}',
                '${data.PQty}',
                '${data.PDiscription}',
                '${data.PPrice}',
                '${IId}'
              )`,
                    (err, result) => {
                      if (err) {
                        console.error(err);
                      } else {
                        console.log("Inserted into database");
                        console.log(data);
                        res.redirect("/SessionHome");
                      }
                    },
                  );
                }
              },
            );
          }
        },
      );
    }
  });
});
router.get("/", (req, res, next) => {
  res.render("indexloginView", {
    userName: req.session.userName,
    type: req.session.type,
  });
});

module.exports = router;
