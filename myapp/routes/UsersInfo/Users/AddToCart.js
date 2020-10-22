var express = require("express");
var router = express.Router();
const con = require("../../databaseRouter/connection");
var SubTotal = require("./SubTotal");
/* GET home page. */

function cards(req, res, next) {
  con.db.query(
    `SELECT * FROM cart WHERE u_id = ${req.session.ids}`,
    (err, showresult) => {
      if (err) {
        res.send("Error in page please try later");
      } else if (showresult.length == 0) {
        res.render("mycart", {
          userName: req.session.userName,
          type: req.session.type,
          present: "no"
        });
      } else {
        const show = showresult;
        console.log("data show");
        SubTotal(req.session.ids);

        console.log(show);
        res.render("mycart", {
          userName: req.session.userName,
          type: req.session.type,
          present: "yes",
          data: show
        });
      }
    }
  );

  // res.render("mycart", {
  //   userName: req.session.userName,
  //   type: req.session.type,
  // });
}

router.post("/", (req, res, next) => {
  let id = req.body.ids;
  let name = req.body.name;
  let size = req.body.size;
  let color = req.body.color;
  let qty = req.body.qty;
  let price = req.body.price;
  let type = req.body.type;
  let total = req.body.total;
  con.db.query(
    `select IMAGE_INFO from selectproducts where p_id = ${id} `,
    (err, imageresult) => {
      if (err) {
        console.log(err);
      } else {
        image = imageresult[0].IMAGE_INFO;

        con.db.query(
          `INSERT INTO cart (P_COLOR,P_ID,P_NAME,P_SIZE,PRICE,TYPES,QTY,TOTAL,U_ID,IMAGE_INFO)
      VALUES
        (
          '${color}',
           ${id},
          '${name}',
          '${size}',
          '${price}',
          '${type}',
           ${qty},
          '${total}',
          ${req.session.ids},
          '${image}'
        )`,
          (err, result) => {
            if (err) {
              console.log(err)
              res.send("Error");
            } else {
              SubTotal(req.session.ids);
              res.send("inserted");
            }
          }
        );
      }
    }
  );
});
router.delete("/", (req, res, next) => {
  con.db.query(
    `DELETE FROM CART WHERE C_ID = ${req.body.id} `,
    (err, result) => {
      if (err) {
        res.send("Data not Deleted");
      } else {
        res.send("Deleated");
        SubTotal(req.session.ids);
      }
    }
  );
});
router.put("/", (req, res, next) => {
  console.log(req.body.id, req.body.qty, req.body.price);
  let total = req.body.qty * req.body.price;
  con.db.query(
    `UPDATE CART SET QTY="${req.body.qty}", TOTAL ="${total}" WHERE C_ID = "${req.body.id}"`,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Updated");
      }
    },
  );
});
module.exports = router;
module.exports.showcart = cards;
