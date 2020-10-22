const show = require("../UsersInfo/Admin/ShowData");
module.exports = app => {
  app.get("/", (req, res, next) => {
    show(req, res, next);
  });
  app.get("/about", (req, res, next) => {
    res.render("about");
  });
  app.get("/contact", (req, res, next) => {
    res.render("contact");
  });
  app.get("/mycart", (req, res, next) => {
    res.render("mycart");
  });
};
