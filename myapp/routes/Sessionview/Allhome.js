const show = require("../UsersInfo/Admin/ShowData");
const showcart = require("../UsersInfo/Users/AddToCart");
const SubTotal = require("../UsersInfo/Users/SubTotal");
module.exports = app => {
  app.get("/SessionHome", (req, res, next) => {
    if (
      (!req.session.userName || req.session.userName === "undefined") &&
      (!req.session.email || req.session.email === "undefine")
    ) {
      res.redirect("/login");
    } else {
      show(req, res, next);
      SubTotal(req.session.ids);
    }
  });
  app.get("/Sessionabout", (req, res, next) => {
    if (
      (!req.session.userName || req.session.userName === "undefined") &&
      (!req.session.email || req.session.email === "undefine")
    ) {
      res.redirect("/login");
    } else {
      res.render("about", {
        userName: req.session.userName,
        type: req.session.type,
      });
    }
  });
  app.get("/Sessioncontact", (req, res, next) => {
    if (
      (!req.session.userName || req.session.userName === "undefined") &&
      (!req.session.email || req.session.email === "undefine")
    ) {
      res.redirect("/login");
    } else {
      res.render("contact", {
        userName: req.session.userName,
        type: req.session.type,
      });
    }
  });
  app.get("/Sessionmycart", (req, res, next) => {
    if (
      (!req.session.userName || req.session.userName === "undefined") &&
      (!req.session.email || req.session.email === "undefine")
    ) {
      res.redirect("/login");
    } else {
      showcart.showcart(req, res, next);
    }
  });

  app.get("/SessionDelivery", (req, res, next) => {
    if (
      (!req.session.userName || req.session.userName === "undefined") &&
      (!req.session.email || req.session.email === "undefine")
    ) {
      res.redirect("/login");
    } else {
      res.render("DeliveryPage", {
        userName: req.session.userName,
        type: req.session.type,
      });
    }
  });
  app.get("/sessionDestroi", (req, res, next) => {
    req.session.destroy(function(err) {
      if (err) throw err;
      res.redirect("/signup");
    });
  });
  app.get("/diagram_area", function(req, res, next) {
    if (
      (!req.session.userName || req.session.userName === "undefined") &&
      (!req.session.email || req.session.email === "undefine")
    ) {
      res.redirect("/login");
    } else {
      res.render("admin_view", {
        userName: req.session.userName,
        type: req.session.type,
      });
    }
  });
};
