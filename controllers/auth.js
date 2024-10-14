const User = require("../models/user");
exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("cookie").split(";")[1].trim().split("=")[1] === 'true';

  // console.log(req.session.isLoggedIn);
  const context = {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  };
  res.render("auth/login", context);
};

exports.postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn = true; ");

  User.findById("67092af36ae6458e782329eb")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save();
    })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
