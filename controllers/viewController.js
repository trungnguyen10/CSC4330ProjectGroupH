exports.getHomePage = function (req, res) {
  res.status(200).render("homepage");
};

exports.getLoginForm = function (req, res) {
  res.status(200).render("login");
};

exports.getSignupForm = function (req, res) {
  res.status(200).render("signup");
};
