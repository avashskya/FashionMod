const con = require("../../databaseRouter/connection");
let SubTotal = session_userid => {
  con.db.query(
    `SELECT TOTAL FROM CART where U_ID =${session_userid}`,
    (err, totals) => {
      if (err) {
        return console.log(err);
      } else {
        if (totals.length) {
          let length = totals.length;
          let subtotal = 0;
          console.log(length);
          for (i = 0; i < length; i++) {
            subtotal = totals[i].TOTAL + subtotal;
          }
          con.db.query(
            `UPDATE CART SET SUMTOTAL ="${subtotal}" where U_ID = "${session_userid}" `,
            (err, update) => {
              if (err) {
                console.error(err);
              } else {
                console.log("success");
              }
            },
          );
          return console.log("total is " + subtotal);
        } else {
          return console.log("0");
        }
      }
    },
  );
};
module.exports = SubTotal;
