const con = require("../../databaseRouter/connection");
module.exports = (req, res, next) => {
  con.db.query(`select * from SelectProducts`, (err, showresult) => {
    if (err) {
      res.render("indexloginView", {
        userName: req.session.userName,
        type: req.session.type,
      });
    } else {
      const show = showresult;
      console.log(show);
      res.render("indexloginView", {
        userName: req.session.userName,
        type: req.session.type,
        images: show,
      });
    }
  });
};
